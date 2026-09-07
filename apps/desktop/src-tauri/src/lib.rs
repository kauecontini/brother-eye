use serde::Serialize;
use std::time::Duration;
use tauri::{AppHandle, Manager, PhysicalPosition, WebviewWindow};

const HUD_LABEL: &str = "tutor-hud";
const HUD_MARGIN_LOGICAL: f64 = 16.0;
const HUD_CYCLE_COUNT: u32 = 40;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HudStatus {
    pub exists: bool,
    pub always_on_top: bool,
    pub visible: bool,
    pub focused: bool,
    pub resizable: bool,
    pub skip_taskbar_configured: bool,
    pub width: u32,
    pub height: u32,
    pub x: i32,
    pub y: i32,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CycleReport {
    pub cycles: u32,
    pub hud_window_count: usize,
    pub visible: bool,
    pub focused: bool,
    pub always_on_top: bool,
    pub resizable: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SelftestReport {
    after_show: HudStatus,
    cycle: CycleReport,
    after_hide: HudStatus,
    position_matches_top_right: bool,
    pass: bool,
    failures: Vec<String>,
}

fn hud(app: &AppHandle) -> Result<WebviewWindow, String> {
    app.get_webview_window(HUD_LABEL)
        .ok_or_else(|| "tutor-hud window missing".to_string())
}

fn position_hud(window: &WebviewWindow) -> Result<(), String> {
    let monitor = window
        .primary_monitor()
        .map_err(|e| e.to_string())?
        .ok_or_else(|| "no primary monitor".to_string())?;
    let work = monitor.work_area();
    let size = window.outer_size().map_err(|e| e.to_string())?;
    let scale = monitor.scale_factor();
    let margin = (HUD_MARGIN_LOGICAL * scale).round() as i32;
    let x = work.position.x + work.size.width as i32 - size.width as i32 - margin;
    let y = work.position.y + margin;
    window
        .set_position(PhysicalPosition::new(x, y))
        .map_err(|e| e.to_string())?;
    Ok(())
}

fn hud_status(window: &WebviewWindow) -> Result<HudStatus, String> {
    let size = window.outer_size().map_err(|e| e.to_string())?;
    let pos = window.outer_position().map_err(|e| e.to_string())?;
    Ok(HudStatus {
        exists: true,
        always_on_top: window.is_always_on_top().map_err(|e| e.to_string())?,
        visible: window.is_visible().map_err(|e| e.to_string())?,
        focused: window.is_focused().map_err(|e| e.to_string())?,
        resizable: window.is_resizable().map_err(|e| e.to_string())?,
        skip_taskbar_configured: true,
        width: size.width,
        height: size.height,
        x: pos.x,
        y: pos.y,
    })
}

#[tauri::command]
fn spike_hud_show(app: AppHandle) -> Result<HudStatus, String> {
    eprintln!("SPIKE1_CMD spike_hud_show");
    let window = hud(&app)?;
    window.set_skip_taskbar(true).map_err(|e| e.to_string())?;
    window.set_always_on_top(true).map_err(|e| e.to_string())?;
    let _ = window.set_focusable(false);
    position_hud(&window)?;
    window.show().map_err(|e| e.to_string())?;
    std::thread::sleep(Duration::from_millis(120));
    hud_status(&window)
}

#[tauri::command]
fn spike_hud_hide(app: AppHandle) -> Result<HudStatus, String> {
    eprintln!("SPIKE1_CMD spike_hud_hide");
    let window = hud(&app)?;
    window.hide().map_err(|e| e.to_string())?;
    hud_status(&window)
}

#[tauri::command]
fn spike_hud_status(app: AppHandle) -> Result<HudStatus, String> {
    eprintln!("SPIKE1_CMD spike_hud_status");
    hud_status(&hud(&app)?)
}

#[tauri::command]
fn spike_hud_cycle(app: AppHandle) -> Result<CycleReport, String> {
    eprintln!("SPIKE1_CMD spike_hud_cycle");
    let window = hud(&app)?;
    for _ in 0..HUD_CYCLE_COUNT {
        window.hide().map_err(|e| e.to_string())?;
        std::thread::sleep(Duration::from_millis(35));
        window.show().map_err(|e| e.to_string())?;
        std::thread::sleep(Duration::from_millis(35));
    }
    let hud_window_count = app
        .webview_windows()
        .keys()
        .filter(|label| label.as_str() == HUD_LABEL)
        .count();
    Ok(CycleReport {
        cycles: HUD_CYCLE_COUNT,
        hud_window_count,
        visible: window.is_visible().map_err(|e| e.to_string())?,
        focused: window.is_focused().map_err(|e| e.to_string())?,
        always_on_top: window.is_always_on_top().map_err(|e| e.to_string())?,
        resizable: window.is_resizable().map_err(|e| e.to_string())?,
    })
}

fn expected_top_right(window: &WebviewWindow) -> Result<(i32, i32), String> {
    let monitor = window
        .primary_monitor()
        .map_err(|e| e.to_string())?
        .ok_or_else(|| "no primary monitor".to_string())?;
    let work = monitor.work_area();
    let size = window.outer_size().map_err(|e| e.to_string())?;
    let scale = monitor.scale_factor();
    let margin = (HUD_MARGIN_LOGICAL * scale).round() as i32;
    let x = work.position.x + work.size.width as i32 - size.width as i32 - margin;
    let y = work.position.y + margin;
    Ok((x, y))
}

fn run_selftest(app: &AppHandle) -> Result<SelftestReport, String> {
    let after_show = spike_hud_show(app.clone())?;
    let (expected_x, expected_y) = expected_top_right(&hud(app)?)?;
    let position_matches_top_right =
        (after_show.x - expected_x).abs() <= 2 && (after_show.y - expected_y).abs() <= 2;
    let cycle = spike_hud_cycle(app.clone())?;
    let after_hide = spike_hud_hide(app.clone())?;

    let mut failures = Vec::new();
    if !after_show.exists {
        failures.push("HUD missing after show".into());
    }
    if !after_show.always_on_top {
        failures.push("always_on_top getter was false after show".into());
    }
    if after_show.focused {
        failures.push("HUD took focus after show".into());
    }
    if after_show.resizable {
        failures.push("HUD is resizable".into());
    }
    if !after_show.visible {
        failures.push("HUD not visible after show".into());
    }
    if !position_matches_top_right {
        failures.push(format!(
            "position {},{} != expected top-right {},{}",
            after_show.x, after_show.y, expected_x, expected_y
        ));
    }
    if cycle.hud_window_count != 1 {
        failures.push(format!(
            "expected 1 HUD window after cycle, got {}",
            cycle.hud_window_count
        ));
    }
    if cycle.focused {
        failures.push("HUD focused after show/hide cycle".into());
    }
    if !cycle.always_on_top {
        failures.push("always_on_top false after cycle".into());
    }
    if after_hide.visible {
        failures.push("HUD still visible after hide".into());
    }
    if after_hide.focused {
        failures.push("HUD focused after hide".into());
    }

    Ok(SelftestReport {
        after_show,
        cycle,
        after_hide,
        position_matches_top_right,
        pass: failures.is_empty(),
        failures,
    })
}

fn maybe_run_selftest(app: &AppHandle) {
    if std::env::var("BROTHER_EYE_SPIKE1_SELFTEST").ok().as_deref() != Some("1") {
        return;
    }
    let handle = app.clone();
    std::thread::spawn(move || {
        std::thread::sleep(Duration::from_millis(900));
        match run_selftest(&handle) {
            Ok(report) => {
                let json = serde_json::to_string(&report).unwrap_or_else(|_| "{}".into());
                eprintln!("SPIKE1_SELFTEST {json}");
                let path = std::env::temp_dir().join("brother-eye-spike1-selftest.json");
                let _ = std::fs::write(&path, json.as_bytes());
                handle.exit(if report.pass { 0 } else { 1 });
            }
            Err(error) => {
                eprintln!("SPIKE1_SELFTEST_ERROR {error}");
                let path = std::env::temp_dir().join("brother-eye-spike1-selftest.json");
                let payload = serde_json::json!({
                    "pass": false,
                    "failures": [error],
                });
                let _ = std::fs::write(&path, payload.to_string());
                handle.exit(1);
            }
        }
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if let Some(window) = app.get_webview_window(HUD_LABEL) {
                let _ = window.set_skip_taskbar(true);
                let _ = window.set_always_on_top(true);
                let _ = window.set_focusable(false);
                let _ = position_hud(&window);
            }
            maybe_run_selftest(app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            spike_hud_show,
            spike_hud_hide,
            spike_hud_status,
            spike_hud_cycle
        ])
        .run(tauri::generate_context!())
        .expect("error while running Brother Eye desktop shell");
}
