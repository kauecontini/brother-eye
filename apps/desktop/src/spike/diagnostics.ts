export type HudStatus = {
  exists: boolean;
  alwaysOnTop: boolean;
  visible: boolean;
  focused: boolean;
  resizable: boolean;
  skipTaskbarConfigured: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
};

export type CycleReport = {
  cycles: number;
  hudWindowCount: number;
  visible: boolean;
  focused: boolean;
  alwaysOnTop: boolean;
  resizable: boolean;
};

export function isHudView(): boolean {
  return new URLSearchParams(window.location.search).get("view") === "hud";
}
