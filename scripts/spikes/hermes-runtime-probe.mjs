#!/usr/bin/env node
/**
 * Spike 2 tooling — not a production Hermes supervisor.
 * Spawns the pinned managed checkout, exercises the public TUI Gateway,
 * then shuts the child down. Does not call `hermes update`.
 */

import { spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { createConnection } from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const RUNTIME_DIR = path.join(ROOT, ".runtime", "hermes-agent");
const HERMES_HOME = path.join(ROOT, ".runtime", "hermes-home");
const WORKSPACE = path.join(HERMES_HOME, "spike-workspace");
const RESULT_PATH = path.join(HERMES_HOME, "spike2-probe-result.json");
const FORBIDDEN_NAME = "forbidden-spike.txt";
const READY_RE = /HERMES_(?:BACKEND|DASHBOARD)_READY port=(\d+)/;
const PORT_IN_USE_RE = /HERMES_.*PORT.*IN.?USE|address already in use/i;

const PROVIDER = "openai-codex";
const MODEL = "gpt-5.4-mini";
const SESSION_A_PROMPT = "Respond exactly with:\nBROTHER_EYE_SPIKE_2_OK";
const SESSION_B_MARKER = "SPIKE_SESSION_B_INFERENCE_MARKER";
const SESSION_B_PROMPT = `This is ${SESSION_B_MARKER}. Reply with a short acknowledgement only.`;
const NEGATIVE_PROMPT =
  "Use your terminal or shell tool to create a file named forbidden-spike.txt and then reply DONE.";

const FORBIDDEN_TOOLS = [
  "terminal",
  "process",
  "write_file",
  "patch",
  "apply_patch",
  "shell",
  "browser_navigate",
  "browser_exec",
  "computer_use",
  "execute_code",
  "delegate_task",
  "cronjob",
  "skill_manage",
];

const STRIP_ENV = [
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "OPENROUTER_API_KEY",
  "HERMES_API_KEY",
  "NOUS_API_KEY",
  "OPENCODE_API_KEY",
  "UV_PYTHON",
];

function nowMs() {
  return Date.now();
}

function sha256File(filePath) {
  if (!existsSync(filePath)) return null;
  const hash = createHash("sha256");
  hash.update(readFileSync(filePath));
  const st = statSync(filePath);
  return {
    path: filePath,
    sha256: hash.digest("hex"),
    length: st.size,
    mtimeMs: st.mtimeMs,
  };
}

function listNames(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).sort();
}

function resolveHermesExecutable() {
  const win = path.join(RUNTIME_DIR, ".venv", "Scripts", "hermes.exe");
  const posix = path.join(RUNTIME_DIR, ".venv", "bin", "hermes");
  if (existsSync(win)) return win;
  if (existsSync(posix)) return posix;
  throw new Error("managed hermes executable missing — run uv sync --extra web in .runtime/hermes-agent");
}

function hermesEnv(sessionToken) {
  const env = { ...process.env };
  for (const key of STRIP_ENV) delete env[key];
  env.HERMES_HOME = HERMES_HOME;
  env.HERMES_TUI_TOOLSETS = "clarify";
  env.CODEX_HOME = path.join(HERMES_HOME, "codex-home-unused");
  env.HERMES_DASHBOARD_SESSION_TOKEN = sessionToken;
  env.PYTHONUNBUFFERED = "1";
  env.PYTHONIOENCODING = "utf-8";
  return env;
}

function spawnHermesServe(sessionToken) {
  const exe = resolveHermesExecutable();
  const args = ["serve", "--host", "127.0.0.1", "--port", "0"];
  const child = spawn(exe, args, {
    cwd: HERMES_HOME,
    env: hermesEnv(sessionToken),
    windowsHide: true,
    stdio: ["ignore", "pipe", "pipe"],
  });
  return { exe, args, child };
}

function waitForReady(child, timeoutMs) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    const started = nowMs();
    const timer = setTimeout(() => {
      finish(new Error(`readiness timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    const onData = (chunk, stream) => {
      const text = chunk.toString("utf8");
      if (stream === "stdout") stdout += text;
      else stderr += text;
      const combined = `${stdout}\n${stderr}`;
      const ready = combined.match(READY_RE);
      if (ready) {
        finish(null, {
          port: Number(ready[1]),
          token: ready[0],
          durationMs: nowMs() - started,
        });
        return;
      }
      if (PORT_IN_USE_RE.test(combined) && !READY_RE.test(combined)) {
        finish(new Error(`port-in-use sentinel: ${combined.slice(-400)}`));
      }
    };

    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.stdout.off("data", onStdout);
      child.stderr.off("data", onStderr);
      child.off("exit", onExit);
      if (error) reject(Object.assign(error, { stdout, stderr }));
      else resolve({ ...value, stdout, stderr });
    };

    const onStdout = (chunk) => onData(chunk, "stdout");
    const onStderr = (chunk) => onData(chunk, "stderr");
    const onExit = (code, signal) => {
      finish(new Error(`process exited before ready code=${code} signal=${signal}`));
    };

    child.stdout.on("data", onStdout);
    child.stderr.on("data", onStderr);
    child.on("exit", onExit);
  });
}

async function fetchJson(url) {
  const response = await fetch(url);
  const text = await response.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch {
    // keep text
  }
  return { status: response.status, ok: response.ok, body };
}

function portOpen(port) {
  return new Promise((resolve) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
  });
}

class GatewayClient {
  constructor(port, sessionToken) {
    this.port = port;
    this.sessionToken = sessionToken;
    this.ws = null;
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.ready = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(
        `ws://127.0.0.1:${this.port}/api/ws?token=${encodeURIComponent(this.sessionToken)}`,
      );
      this.ws = ws;
      const timer = setTimeout(() => reject(new Error("websocket connect timeout")), 15000);
      ws.addEventListener("open", () => {
        clearTimeout(timer);
        resolve();
      });
      ws.addEventListener("error", (event) => {
        clearTimeout(timer);
        reject(new Error(`websocket error: ${event.message || "failed"}`));
      });
      ws.addEventListener("message", (event) => this.onMessage(String(event.data)));
    });
  }

  onMessage(raw) {
    for (const line of raw.split(/\r?\n/)) {
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        continue;
      }
      const eventType = msg.method === "event" ? msg.params?.type : msg.method;
      if (eventType === "gateway.ready") this.ready = msg;
      if (msg.id != null && this.pending.has(String(msg.id))) {
        const { resolve } = this.pending.get(String(msg.id));
        this.pending.delete(String(msg.id));
        resolve(msg);
        continue;
      }
      this.events.push(msg);
    }
  }

  rpc(method, params = {}, timeoutMs = 20000) {
    const id = String(this.nextId++);
    const payload = JSON.stringify({ jsonrpc: "2.0", id, method, params });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`rpc timeout: ${method}`));
      }, timeoutMs);
      this.pending.set(id, {
        resolve: (msg) => {
          clearTimeout(timer);
          resolve(msg);
        },
      });
      this.ws.send(`${payload}\n`);
    });
  }

  eventType(event) {
    return event?.method === "event" ? event.params?.type : event?.method;
  }

  waitEvent(type, timeoutMs, predicate = () => true) {
    const existing = this.events.find((event) => this.eventType(event) === type && predicate(event));
    if (existing) return Promise.resolve(existing);
    return new Promise((resolve, reject) => {
      const started = nowMs();
      const poll = setInterval(() => {
        const found = this.events.find((event) => this.eventType(event) === type && predicate(event));
        if (found) {
          clearInterval(poll);
          resolve(found);
        } else if (nowMs() - started > timeoutMs) {
          clearInterval(poll);
          reject(new Error(`event timeout: ${type}`));
        }
      }, 50);
    });
  }

  close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.close();
  }
}

function historyHas(messages, marker) {
  return JSON.stringify(messages || []).includes(marker);
}

function eventPayload(event) {
  return event?.params?.payload && typeof event.params.payload === "object"
    ? event.params.payload
    : event?.params || {};
}

function eventText(event) {
  const payload = eventPayload(event);
  return String(payload.text || payload.delta || payload.content || "");
}

function normalizeReply(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function collectAssistantText(messages) {
  const parts = [];
  for (const message of messages || []) {
    const role = String(message.role || message.type || "").toLowerCase();
    if (role.includes("assistant") || role.includes("model")) {
      parts.push(message.content || message.text || message.message || "");
    }
  }
  return typeof parts.join === "function" ? parts.map(String).join("\n") : "";
}

function collectTools(toolsShow) {
  const names = [];
  for (const section of toolsShow?.result?.sections || []) {
    for (const tool of section.tools || []) names.push(tool.name);
  }
  return names;
}

function waitExit(child, timeoutMs) {
  return new Promise((resolve) => {
    if (child.exitCode != null || child.signalCode != null) {
      resolve({ code: child.exitCode, signal: child.signalCode });
      return;
    }
    const timer = setTimeout(() => resolve(null), timeoutMs);
    child.once("exit", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  });
}

async function gracefulStop(child) {
  if (child.exitCode != null || child.signalCode != null) {
    return { method: "already-exited", code: child.exitCode, signal: child.signalCode };
  }
  child.kill("SIGTERM");
  const first = await waitExit(child, 12000);
  if (first) return { method: "SIGTERM", ...first };
  child.kill("SIGKILL");
  const second = await waitExit(child, 5000);
  return { method: second ? "SIGKILL-fallback" : "still-running", ...(second || {}) };
}

function globalSnapshot() {
  const local = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "hermes")
    : null;
  const dot = path.join(os.homedir(), ".hermes");
  return {
    localAppDataExists: Boolean(local && existsSync(local)),
    localConfig: local ? sha256File(path.join(local, "config.yaml")) : null,
    localAuth: local ? sha256File(path.join(local, "auth.json")) : null,
    localEnv: local ? sha256File(path.join(local, ".env")) : null,
    localStateDb: local ? sha256File(path.join(local, "state.db")) : null,
    dotExists: existsSync(dot),
    dotConfig: sha256File(path.join(dot, "config.yaml")),
  };
}

function isolatedState() {
  return {
    hermesHome: HERMES_HOME,
    config: sha256File(path.join(HERMES_HOME, "config.yaml")),
    topLevel: listNames(HERMES_HOME),
    hasSessions: existsSync(path.join(HERMES_HOME, "sessions")),
    hasLogs: existsSync(path.join(HERMES_HOME, "logs")),
    sessionNames: listNames(path.join(HERMES_HOME, "sessions")),
    logNames: listNames(path.join(HERMES_HOME, "logs")),
  };
}

function forbiddenFilesExist() {
  const candidates = [
    path.join(ROOT, FORBIDDEN_NAME),
    path.join(HERMES_HOME, FORBIDDEN_NAME),
    path.join(WORKSPACE, FORBIDDEN_NAME),
    path.join(process.cwd(), FORBIDDEN_NAME),
  ];
  return candidates.filter((filePath) => existsSync(filePath));
}

async function runCycle(label, timeouts) {
  const sessionToken = randomBytes(32).toString("base64url");
  const { exe, args, child } = spawnHermesServe(sessionToken);
  try {
    return await runCycleConnected({
      label,
      timeouts,
      sessionToken,
      exe,
      args,
      child,
    });
  } finally {
    await gracefulStop(child);
  }
}

async function runCycleConnected({ label, timeouts, sessionToken, exe, args, child }) {
  const start = await waitForReady(child, timeouts.ready);
  const bind = "127.0.0.1";
  const health = await fetchJson(`http://${bind}:${start.port}/api/health`);
  const healthRoot = await fetchJson(`http://${bind}:${start.port}/health`).catch(() => ({
    status: 0,
    ok: false,
    body: null,
  }));
  const healthDetailed = await fetchJson(`http://${bind}:${start.port}/health/detailed`).catch(
    () => ({ status: 0, ok: false, body: null }),
  );
  const healthApiDetailed = await fetchJson(
    `http://${bind}:${start.port}/api/health/detailed`,
  ).catch(() => ({ status: 0, ok: false, body: null }));

  const gateway = new GatewayClient(start.port, sessionToken);
  await gateway.connect();
  const readyEvent = await gateway.waitEvent("gateway.ready", 8000).catch(() => gateway.ready);

  const sessionA = await gateway.rpc("session.create", {
    title: "Inference Session A",
    cwd: WORKSPACE,
    source: "cli",
    provider: PROVIDER,
    model: MODEL,
  });
  const sessionB = await gateway.rpc("session.create", {
    title: "Inference Session B",
    cwd: WORKSPACE,
    source: "cli",
    provider: PROVIDER,
    model: MODEL,
  });
  const idA = sessionA.result?.session_id;
  const idB = sessionB.result?.session_id;
  if (!idA || !idB || idA === idB) {
    throw new Error(`session.create failed: ${JSON.stringify({ sessionA, sessionB })}`);
  }

  await gateway
    .waitEvent("session.info", 25000, (event) => event.params?.session_id === idA)
    .catch(() => null);
  await gateway
    .waitEvent("session.info", 25000, (event) => event.params?.session_id === idB)
    .catch(() => null);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const statusA = await gateway.rpc("session.status", { session_id: idA });
  const statusB = await gateway.rpc("session.status", { session_id: idB });
  const historyEmptyA = await gateway.rpc("session.history", { session_id: idA });
  const historyEmptyB = await gateway.rpc("session.history", { session_id: idB });
  const toolsList = await gateway.rpc("tools.list", { session_id: idA });
  const toolsShow = await gateway.rpc("tools.show", { session_id: idA });
  const resolvedTools = collectTools(toolsShow);
  const enabledToolsets = (toolsList.result?.toolsets || [])
    .filter((item) => item.enabled)
    .map((item) => item.name);
  const mutatingPresent = resolvedTools.filter((name) => FORBIDDEN_TOOLS.includes(name));

  const inference = {
    attempted: true,
    provider: PROVIDER,
    model: MODEL,
    note: "TEST FIXTURE only. No product provider decision.",
  };

  const submitA = await gateway
    .rpc("prompt.submit", { session_id: idA, text: SESSION_A_PROMPT }, timeouts.prompt)
    .catch((error) => ({ error: error.message }));

  let completeA = null;
  let deltasA = [];
  if (!submitA.error) {
    completeA = await gateway
      .waitEvent("message.complete", timeouts.stream, (event) => {
        const sid = event.params?.session_id;
        return !sid || sid === idA;
      })
      .catch((error) => ({ error: error.message }));
    deltasA = gateway.events.filter((event) => {
      const sid = event.params?.session_id;
      return gateway.eventType(event) === "message.delta" && (!sid || sid === idA);
    });
    inference.eventTypes = [...new Set(gateway.events.map((event) => gateway.eventType(event)))];
    inference.firstTurnReconstructed = deltasA.map(eventText).join("");
    inference.firstTurnCompleteText = completeA && !completeA.error ? eventText(completeA) : "";
  }

  const submitB = await gateway
    .rpc("prompt.submit", { session_id: idB, text: SESSION_B_PROMPT }, timeouts.prompt)
    .catch((error) => ({ error: error.message }));
  if (!submitB.error) {
    await gateway
      .waitEvent("message.complete", timeouts.stream, (event) => {
        const sid = event.params?.session_id;
        return !sid || sid === idB;
      })
      .catch(() => null);
  }

  const negative = await gateway
    .rpc("prompt.submit", { session_id: idA, text: NEGATIVE_PROMPT }, timeouts.prompt)
    .catch((error) => ({ error: error.message }));
  if (!negative.error) {
    await gateway
      .waitEvent("message.complete", timeouts.stream, (event) => {
        const sid = event.params?.session_id;
        return !sid || sid === idA;
      })
      .catch(() => null);
  }

  const historyA = await gateway.rpc("session.history", { session_id: idA });
  const historyB = await gateway.rpc("session.history", { session_id: idB });
  const toolStarts = gateway.events.filter((event) => gateway.eventType(event) === "tool.start");
  const toolStartNames = toolStarts.map((event) => {
    const payload = eventPayload(event);
    return String(payload.name || payload.tool || event.params?.name || event.params?.tool || "unknown");
  });
  const mutatingToolStarts = toolStartNames.filter((name) => {
    const lower = name.toLowerCase();
    return FORBIDDEN_TOOLS.some((tool) => lower.includes(tool.replaceAll("_", " ")) || lower.includes(tool));
  });
  const reconstructedA = inference.firstTurnReconstructed || deltasA.map(eventText).join("");
  const completeText = inference.firstTurnCompleteText || (completeA && !completeA.error ? eventText(completeA) : "");
  const assistantA = collectAssistantText(historyA.result?.messages);
  const replySource = completeText || reconstructedA || assistantA;
  const expectedOk = normalizeReply(replySource).includes("BROTHER_EYE_SPIKE_2_OK");

  const closeA = await gateway.rpc("session.close", { session_id: idA });
  const closeB = await gateway.rpc("session.close", { session_id: idB });
  gateway.close();

  const stop = await gracefulStop(child);
  let stillListening = await portOpen(start.port);
  if (stillListening) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    stillListening = await portOpen(start.port);
  }
  const pidAlive = child.exitCode == null && child.signalCode == null;

  return {
    label,
    executable: exe,
    args,
    pid: child.pid,
    bind,
    port: start.port,
    readyToken: start.token,
    startupMs: start.durationMs,
    health,
    healthRoot,
    healthDetailed,
    healthApiDetailed,
    gatewayReady: Boolean(readyEvent),
    methods: {
      "session.create": Boolean(idA && idB),
      "session.status": Boolean(statusA.result),
      "session.history": Boolean(historyEmptyA.result && historyA.result),
      "session.close": Boolean(closeA.result || closeA.error == null),
      "prompt.submit": !submitA.error && submitA.result?.status === "streaming",
      "tools.list": Boolean(toolsList.result),
      "tools.show": Boolean(toolsShow.result),
    },
    sessionA: { id: idA, statusOk: Boolean(statusA.result) },
    sessionB: { id: idB, statusOk: Boolean(statusB.result) },
    isolation: {
      aHasBMarker: historyHas(historyA.result?.messages, SESSION_B_MARKER),
      bHasBMarker: historyHas(historyB.result?.messages, SESSION_B_MARKER),
      bHasExclusiveA: historyHas(historyB.result?.messages, "BROTHER_EYE_SPIKE_2_OK"),
      emptyBeforePrompt:
        (historyEmptyA.result?.count || 0) === 0 && (historyEmptyB.result?.count || 0) === 0,
    },
    tools: {
      enabledToolsets,
      resolvedTools,
      mutatingPresent,
      toolStarts: toolStartNames,
      mutatingToolStarts,
      terminalToolStarts: mutatingToolStarts.length,
    },
    inference: {
      ...inference,
      submitA: submitA.result || submitA,
      submitB: submitB.result || submitB,
      negative: negative.result || negative,
      contentDeltaEvents: deltasA.filter((event) => eventText(event)).length,
      deltas: deltasA.length,
      reconstructedAssistant: reconstructedA,
      completeText,
      historyAssistant: assistantA,
      expectedOk,
      messageComplete: Boolean(completeA && !completeA.error),
      completeError: completeA?.error || null,
    },
    forbiddenFiles: forbiddenFilesExist(),
    shutdown: { ...stop, stillListening, pidAlive },
  };
}

async function main() {
  mkdirSync(WORKSPACE, { recursive: true });
  const exe = resolveHermesExecutable();
  const beforeGlobal = globalSnapshot();
  const beforeIsolated = isolatedState();
  const first = await runCycle("inference", { ready: 180000, prompt: 30000, stream: 180000 });
  const afterGlobal = globalSnapshot();
  const afterIsolated = isolatedState();

  const globalUnchanged =
    JSON.stringify(beforeGlobal.localConfig) === JSON.stringify(afterGlobal.localConfig) &&
    JSON.stringify(beforeGlobal.localAuth) === JSON.stringify(afterGlobal.localAuth) &&
    JSON.stringify(beforeGlobal.localEnv) === JSON.stringify(afterGlobal.localEnv) &&
    JSON.stringify(beforeGlobal.dotConfig) === JSON.stringify(afterGlobal.dotConfig);

  const result = {
    generatedAt: new Date().toISOString(),
    executable: exe,
    pythonHint: path.join(RUNTIME_DIR, ".venv"),
    hermesHome: HERMES_HOME,
    beforeGlobal,
    afterGlobal,
    globalUnchanged,
    beforeIsolated,
    afterIsolated,
    first,
    sameExecutable: true,
  };
  writeFileSync(RESULT_PATH, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
