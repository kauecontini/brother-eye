pub fn desktop_shell_skeleton() -> &'static str {
    "brother-eye-desktop-shell-a0"
}

#[cfg(test)]
mod tests {
    use super::desktop_shell_skeleton;

    #[test]
    fn skeleton_id_is_stable() {
        assert_eq!(desktop_shell_skeleton(), "brother-eye-desktop-shell-a0");
    }
}
