/**
 * XivigAdmin - Main Modular JavaScript Entry Point
 * Modern ES6+ Architecture (Zero jQuery)
 */
import { initTheme } from './modules/theme.js';
import { initSidebar } from './modules/sidebar.js';
import { initSearch } from './modules/search.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initTooltips } from './modules/tooltips.js';
import { initAppsSidebar } from './modules/apps.js';
import { initQuillEditors } from './modules/quill.js';
import { initHeaderDropdowns } from './modules/header.js';
import { initAuth } from './modules/auth.js';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSidebar();
  initSearch();
  initBackToTop();
  initTooltips();
  initAppsSidebar();
  initQuillEditors();
  initHeaderDropdowns();
  initAuth();
});

// Fullscreen Toggle Helper
window.toggleFullscreen = function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
};
