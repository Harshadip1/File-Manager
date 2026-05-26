/**
 * LocalStorage persistence for favorites, theme, settings
 */
const NexusStorage = (function () {
  const KEYS = {
    theme: 'nexus_theme',
    favorites: 'nexus_favorites',
    trash: 'nexus_trash_ids',
    settings: 'nexus_settings',
    recentSearches: 'nexus_recent_searches',
    language: 'nexus_language'
  };

  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function getFavorites() {
    return get(KEYS.favorites, []);
  }

  function toggleFavorite(fileId) {
    const favs = getFavorites();
    const idx = favs.indexOf(fileId);
    if (idx >= 0) favs.splice(idx, 1);
    else favs.push(fileId);
    set(KEYS.favorites, favs);
    return favs.includes(fileId);
  }

  function isFavorite(fileId) {
    return getFavorites().includes(fileId);
  }

  function getTheme() {
    return localStorage.getItem(KEYS.theme) || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(KEYS.theme, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  function getSettings() {
    return get(KEYS.settings, {
      notifications: true,
      autoSync: true,
      compression: false,
      twoFactor: true,
      offlineMode: false
    });
  }

  function saveSettings(settings) {
    set(KEYS.settings, { ...getSettings(), ...settings });
  }

  function addRecentSearch(query) {
    if (!query.trim()) return;
    let recent = get(KEYS.recentSearches, []);
    recent = [query, ...recent.filter(q => q !== query)].slice(0, 10);
    set(KEYS.recentSearches, recent);
  }

  function getRecentSearches() {
    return get(KEYS.recentSearches, []);
  }

  return {
    KEYS,
    get,
    set,
    getFavorites,
    toggleFavorite,
    isFavorite,
    getTheme,
    setTheme,
    getSettings,
    saveSettings,
    addRecentSearch,
    getRecentSearches
  };
})();
