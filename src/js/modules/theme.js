/**
 * Theme Module - Dark/Light mode toggle and persistence
 */
const THEME_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';
const mql = window.matchMedia('(prefers-color-scheme: dark)');

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (_) {
    return null;
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (_) {}
}

export function setTheme(theme) {
  if (theme === DARK_THEME) {
    document.documentElement.setAttribute('data-theme', DARK_THEME);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
}

export function toggleTheme() {
  const newTheme = getTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  setTheme(newTheme);
  setStoredTheme(newTheme);
  return newTheme;
}

export function initTheme() {
  const savedTheme = getStoredTheme();
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(mql.matches ? DARK_THEME : LIGHT_THEME);
  }

  const handleChange = (e) => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    }
  };

  if (mql.addEventListener) {
    mql.addEventListener('change', handleChange);
  } else if (mql.addListener) {
    mql.addListener(handleChange);
  }

  document.querySelectorAll('.theme-toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  window.Theme = {
    toggle: toggleTheme,
    setDark: () => { setTheme(DARK_THEME); setStoredTheme(DARK_THEME); },
    setLight: () => { setTheme(LIGHT_THEME); setStoredTheme(LIGHT_THEME); },
    isDark: () => getTheme() === DARK_THEME,
    getTheme
  };
}
