import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button";
import { HudView } from "@/spike/HudView";
import {
  isHudView,
  type CycleReport,
  type HudStatus,
} from "@/spike/diagnostics";

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

function MainView() {
  const [status, setStatus] = useState<HudStatus | null>(null);
  const [cycle, setCycle] = useState<CycleReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    setError(null);
    const next = await invoke<HudStatus>("spike_hud_status");
    setStatus(next);
  }

  async function run(command: "spike_hud_show" | "spike_hud_hide") {
    setBusy(true);
    setError(null);
    try {
      const next = await invoke<HudStatus>(command);
      setStatus(next);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setBusy(false);
    }
  }

  async function runCycle() {
    setBusy(true);
    setError(null);
    try {
      const report = await invoke<CycleReport>("spike_hud_cycle");
      setCycle(report);
      await refresh();
    } catch (err) {
      setError(formatError(err));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void (async () => {
      try {
        setStatus(await invoke<HudStatus>("spike_hud_status"));
        setStatus(await invoke<HudStatus>("spike_hud_show"));
      } catch (err) {
        setError(formatError(err));
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-[#101317] p-6 text-[#e7eaee]">
      <p className="text-xs tracking-[0.18em] text-[#9aa3ad] uppercase">
        Architecture Spike 1
      </p>
      <h1 className="mt-2 text-2xl font-medium">Brother Eye</h1>
      <p className="mt-1 text-sm text-[#9aa3ad]">Desktop Shell · Tauri 2</p>

      <section className="mt-6 rounded-md border border-[#2a313a] bg-[#171b21] p-4">
        <h2 className="text-sm font-medium">HUD</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button disabled={busy} onClick={() => void run("spike_hud_show")}>
            Show HUD
          </Button>
          <Button
            disabled={busy}
            variant="outline"
            onClick={() => void run("spike_hud_hide")}
          >
            Hide HUD
          </Button>
          <Button disabled={busy} variant="secondary" onClick={() => void runCycle()}>
            Repeat show/hide
          </Button>
        </div>
      </section>

      <section className="mt-4 rounded-md border border-[#2a313a] bg-[#171b21] p-4 font-mono text-xs leading-6">
        <h2 className="mb-2 font-sans text-sm font-medium">Diagnostics</h2>
        {status ? (
          <>
            <div>HUD detected: {String(status.exists)}</div>
            <div>Always on top: {String(status.alwaysOnTop)}</div>
            <div>Visible: {String(status.visible)}</div>
            <div>Focused: {String(status.focused)}</div>
            <div>Resizable: {String(status.resizable)}</div>
            <div>
              Size: {status.width}×{status.height}
            </div>
            <div>
              Position: {status.x},{status.y}
            </div>
            <div>Skip taskbar configured: {String(status.skipTaskbarConfigured)}</div>
          </>
        ) : (
          <div>Loading HUD status…</div>
        )}
        {cycle ? (
          <div className="mt-3 border-t border-[#2a313a] pt-3">
            <div>Cycles: {cycle.cycles}</div>
            <div>HUD window count: {cycle.hudWindowCount}</div>
            <div>After cycle focused: {String(cycle.focused)}</div>
            <div>After cycle always on top: {String(cycle.alwaysOnTop)}</div>
            <div>After cycle resizable: {String(cycle.resizable)}</div>
          </div>
        ) : null}
        {error ? <div className="mt-3 text-[#c9847a]">Error: {error}</div> : null}
      </section>
    </main>
  );
}

export default function App() {
  if (isHudView()) {
    return <HudView />;
  }
  return <MainView />;
}
