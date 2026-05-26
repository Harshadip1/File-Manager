/**
 * Theme customization - dark/light toggle
 */
const NexusThemes = (function () {
  function init() {
    const theme = NexusStorage.getTheme();
    applyTheme(theme);
    bindToggle();
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    NexusStorage.setTheme(theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggle() {
    const current = NexusStorage.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    if (typeof NexusApp !== 'undefined') NexusApp.toast(`Switched to ${next} theme`);
  }

  function bindToggle() {
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, toggle, applyTheme };
})();
