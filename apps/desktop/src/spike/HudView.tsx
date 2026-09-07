export function HudView() {
  return (
    <main className="flex h-screen items-center justify-between bg-[#171b21] px-4">
      <div>
        <p className="text-[11px] tracking-[0.16em] text-[#9aa3ad] uppercase">
          Brother Eye
        </p>
        <h1 className="mt-1 text-sm font-medium text-[#e7eaee]">
          Tutor HUD — Architecture Spike
        </h1>
      </div>
      <p className="text-xs text-[#9aa3ad]">No observation active</p>
    </main>
  );
}
