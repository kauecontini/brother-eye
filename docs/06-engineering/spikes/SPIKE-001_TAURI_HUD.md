# Spike 001 — Tauri + HUD

Status:
PASS

Date:
2026-09-07

## Question

Does Tauri 2 work as a Windows standalone desktop shell for Brother Eye, with a main window plus a compact always-on-top Tutor HUD, minimal per-window capabilities, and React + Vite + Tailwind + shadcn (Base UI) inside that shell?

## Environment

- OS: Microsoft Windows 11 Pro, 64-bit, 10.0.26200
- Arch: x86_64
- MSVC: Visual Studio 2022 Build Tools 17.14.39 (MSVC 14.44), `vcvars64.bat`
- WebView2 Runtime: 152.0.4191.66 (already present; not reinstalled)
- Package manager: pnpm 9.15.9 via Corepack
- Rust toolchain: stable-x86_64-pc-windows-msvc (not nightly)

## Versions

| Component | Version |
| --- | --- |
| Windows | 11 Pro 10.0.26200 x64 |
| rustc | 1.98.1 (48a229cea 2026-09-01) |
| cargo | 1.98.1 (797e8a9bc 2026-08-05) |
| rustup | 1.29.1 (d95a37b6a 2026-08-13) |
| Node | 22.23.2 |
| pnpm | 9.15.9 |
| Corepack | 0.34.6 |
| Tauri CLI (`@tauri-apps/cli`) | 2.11.4 |
| tauri crate | 2.11.5 |
| tauri-build | 2.6.3 |
| `@tauri-apps/api` | 2.11.1 |
| Vite | 7.3.6 |
| React / React DOM | 19.2.8 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 4.3.3 (`@tailwindcss/vite` 4.3.3) |
| shadcn CLI | 4.21.0, style `base-nova` |
| Primitive base | Base UI `@base-ui/react` 1.8.0 |
| WebView2 | 152.0.4191.66 |

Provisional bundle identifier: `com.brothereye.desktop` (implementation identifier only; not a commercial/legal decision).

## Implementation

- Integrated Tauri 2 into existing `apps/desktop/` A0 skeleton. Did not run destructive `create-tauri-app`.
- Frontend: React + Vite + TypeScript + Tailwind v4 + shadcn Button only (Base UI primitive). View switch via `?view=hud` (no router).
- Windows: `main` (diagnostic panel) and `tutor-hud` (compact HUD). No third window.
- HUD config: `alwaysOnTop`, `skipTaskbar`, `decorations: false`, `resizable: false`, `focus: false`, `focusable: false`, `visible: false` at startup, opaque background.
- Narrow Rust commands: `spike_hud_show`, `spike_hud_hide`, `spike_hud_status`, `spike_hud_cycle`. No `set_focus()` on show. HUD placed top-right of primary work area with 16px logical margin.
- Capabilities: `main-capability` allows only the four spike commands and denies window/webview create. `hud-capability` has empty permissions. No shell, filesystem, or process plugins.
- Optional env `BROTHER_EYE_SPIKE1_SELFTEST=1` runs the 40-cycle diagnostic and writes `%TEMP%\brother-eye-spike1-selftest.json`.

## Tests

- `corepack pnpm --filter @brother-eye/desktop typecheck` — PASS
- `corepack pnpm --filter @brother-eye/desktop build` — PASS (Vite 7.3.6)
- `cargo check --manifest-path apps/desktop/src-tauri/Cargo.toml` — PASS
- `pnpm exec tauri build --debug --no-bundle --ci` — PASS; binary `apps/desktop/src-tauri/target/debug/brother-eye-desktop-shell.exe`
- `pnpm exec tauri info` — PASS (versions above)
- Debug binary selftest (`BROTHER_EYE_SPIKE1_SELFTEST=1`) — PASS
- `tauri dev` — process starts, Vite on `:1420`, no panic; frontend `invoke` logs `spike_hud_status` then `spike_hud_show`
- `uv run pytest` (core) — 5 passed
- `uv run ruff check .` (core) — All checks passed
- Win32 snapshot of running HUD: `WS_EX_TOPMOST=true`, `WS_EX_NOACTIVATE=true`

Selftest JSON (pass: true, failures: []):

```json
{"afterShow":{"exists":true,"alwaysOnTop":true,"visible":true,"focused":false,"resizable":false,"skipTaskbarConfigured":true,"width":932,"height":259,"x":2868,"y":40},"cycle":{"cycles":40,"hudWindowCount":1,"visible":true,"focused":false,"alwaysOnTop":true,"resizable":false},"afterHide":{"exists":true,"alwaysOnTop":true,"visible":false,"focused":false,"resizable":false,"skipTaskbarConfigured":true,"width":932,"height":259,"x":2868,"y":40},"positionMatchesTopRight":true,"pass":true,"failures":[]}
```

## Results

- Main and `tutor-hud` both exist.
- `is_always_on_top()` is true after show and after 40 hide/show cycles. OS style also has `WS_EX_TOPMOST`.
- Show does not call `set_focus()`. `is_focused()` is false after show and after the cycle. OS style has `WS_EX_NOACTIVATE`.
- Cycle count 40, HUD window count remains 1; hide then reports `visible: false`.
- Position matches computed primary-work-area top-right (tolerance 2px).
- Configured HUD size is 360×96 logical. Observed outer size is DPI/physical (selftest 932×259; live `GetWindowRect` 373×104). Compact in logical terms.
- `skipTaskbar: true` is set in config and via `set_skip_taskbar(true)`. Tauri has no `is_skip_taskbar` getter. Taskbar absence was not visually confirmed by the agent.
- Renderer has no Node, no shell/fs/process plugins, CSP `default-src 'self'`.

## Acceptance Criteria

| Criterion | Result | Evidence |
| --- | --- | --- |
| Tauri app compiles | PASS | `tauri build --debug --no-bundle`; `cargo check` |
| Tauri dev starts | PASS | Vite `:1420`; `Running target\debug\brother-eye-desktop-shell.exe`; no panic |
| Main window exists | PASS | label `main`; live title `Brother Eye` |
| tutor-hud exists | PASS | label `tutor-hud`; getter `exists: true` |
| HUD always-on-top getter true | PASS | `alwaysOnTop: true`; `WS_EX_TOPMOST` |
| Show/hide without recreation bug | PASS | 40 cycles; `hudWindowCount: 1` |
| HUD skip taskbar (config/API) | PASS | `skipTaskbar: true` + `set_skip_taskbar(true)` Ok; no getter |
| HUD does not take focus (programmatic) | PASS | `focused: false`; no `set_focus()`; `WS_EX_NOACTIVATE` |
| HUD not resizable | PASS | `resizable: false` after show and cycle |
| Positioning valid | PASS | `positionMatchesTopRight: true` |
| Capabilities exclude shell/fs/process | PASS | no plugins; HUD empty ACL; main spike commands only |
| React/Vite/Tailwind/shadcn build | PASS | `tsc --noEmit`; Vite build |
| A0 contract tests still pass | PASS | pytest 5 passed; ruff clean |
| No domain features | PASS | no Session/Observation/Tutor/Hermes/Cua/Burp/SQLite/JSON-RPC |

## Issues

- Cargo warns that bin and lib PDB names collide if the lib crate uses the package name. Lib crate renamed to `brother_eye_desktop_lib`.
- React `StrictMode` double-invokes status/show in dev. Same window; not a duplicate-window bug.
- WebView2 shutdown can log `Failed to unregister class Chrome_WidgetWin_0` (error 1412). Process still exited 0.
- Tauri window APIs do not expose `is_skip_taskbar`.

## Limitations

- Agent did not visually confirm z-order above unrelated apps, nor HUD absence from the Windows taskbar. Those remain human checks.
- Physical outer size varies with DPI; logical config remains 360×96.
- Bundle identifier `com.brothereye.desktop` is provisional.
- Selftest writes a temp JSON file from Rust only when `BROTHER_EYE_SPIKE1_SELFTEST=1`.

## Architecture Decision

ADR-001 remains ACCEPTED.

## Next Step

Spike 2 — Hermes managed runtime
