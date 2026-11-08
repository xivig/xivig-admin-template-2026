# XivigAdmin 2026 - Elite Modern Modular Admin Dashboard Template

<div align="center">

![XivigAdmin Dashboard Preview](src/assets/img/xivig-dashboard-preview.png)

[![Vite](https://img.shields.io/badge/Vite-8.x%20%7C%20Fast%20HMR-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Sass](https://img.shields.io/badge/Dart%20Sass-Embedded-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![JavaScript](https://img.shields.io/badge/ES6%2B%20Modular-Pure%20Native-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![Zero jQuery](https://img.shields.io/badge/jQuery-Zero%20(Pure%20ES6)-success)](#)
[![Quill](https://img.shields.io/badge/Quill-v2.0%20Rich%20Editor-3BB2D0)](https://quilljs.com/)
[![Standalone Build](https://img.shields.io/badge/Dist-Standalone%20(No%20Server%20Req)-brightgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**XivigAdmin 2026** is an ultra-refined, futuristic yet enterprise-ready responsive admin dashboard template. Built from the ground up for modern engineering teams with **Vite 8**, modular **Dart Sass (SCSS)**, lightweight **ES6+ native modules (Zero jQuery)**, and **85 production-ready standalone HTML pages**.

[Explore Pages Catalog](docs/PAGES-CATALOG.md) • [Architecture Guide](docs/ARCHITECTURE.md) • [Theming & SCSS](docs/SCSS-THEMING.md) • [Deployment Guide](docs/DEPLOYMENT.md)

</div>

---

## 🌿 Git Branches & Repository Structure

| Branch | Description | Status |
| :--- | :--- | :--- |
| **`main`** | Production-ready primary branch tracking the modern XivigAdmin suite. | **Default Branch** |
| **`xivigadmin`** | Development and feature branch for XivigAdmin 2026. | **Active & Maintained** |
| **`niceadmin-original`** | The complete original final NiceAdmin modular baseline preserved in its pristine state. | Preserved & Isolated |

---

## ✨ Standout Features

### 💎 Elite Visual Design System
- **Cosmic Obsidian Dark Mode** (`#070a13` canvas, `#0d1322` surfaces, glowing indigo accents) and **Radiant Slate Light Mode**.
- **Electric Accent Palette**: Deep Indigo (`#4f46e5`), Vivid Rose (`#f43f5e`), and Cyber Emerald (`#10b981`).
- **Frosted Glassmorphic Header**: `backdrop-filter: blur(16px)` with a translucent rim light and interactive quick-access grid.
- **Micro-Interactions**:
  - **On-Hover Profile Card**: Automatic pop-in card with a forgiving 180ms debounce bridge, synchronized with Bootstrap 5 dropdown APIs and touch-friendly fallback.
  - **3-Line Hamburger**: Clean, modern 3-line menu toggle placed to the right of the brand badge.
  - **Ultra-Slim Floating Scrollbars**: Customized 4px global floating scrollbars and 3px sidebar scrollbars with hover gradient illumination and transparent tracks.
  - **Razor-Thin 1px Sidebar Border**: Clean hairline border eliminating legacy blur shadows.

### ⚡ High-Performance Developer Velocity
- **Powered by Vite 8**: Instant server start, lightning-fast Hot Module Replacement (HMR), and rapid build times (~3.4s).
- **Automated Partial & Layout Pipeline**: Reusable components (`<include src="..." />`) and page wrappers (`<layout src="..." />`).
- **Smart Sidebar Accordion**: Automatically detects current route and expands parent menus while keeping adjacent sibling submenus cleanly collapsed.
- **Zero jQuery**: 100% native ES6+ modules in `src/js/modules/` for Theme, Sidebar, Header, Search, Tooltips, Apps, and Quill.

### 📦 100% Standalone Production Output (`dist/`)
- All 85 pages flatten to `dist/*.html` with normalized relative paths.
- Works offline straight from disk via the `file:///` protocol (double-click `index.html` without needing `localhost` or any server).
- Clean asset structure with images isolated into `dist/assets/img/`.

---

## 📁 Repository Directory Structure

```
xivig-admin-template-2026/
├── docs/                        # In-depth architectural & developer documentation
│   ├── ARCHITECTURE.md          # Vite build pipeline & include resolution
│   ├── PAGES-CATALOG.md         # Comprehensive breakdown of all 85 pages
│   ├── SCSS-THEMING.md          # Design tokens, color palette, dark mode guide
│   └── DEPLOYMENT.md            # GitHub Pages, Vercel, Netlify, Nginx guide
├── dist/                        # 100% Standalone production distribution
│   ├── assets/
│   │   ├── css/                 # Compiled & minified stylesheets
│   │   ├── js/                  # Bundled ES6+ application modules
│   │   ├── img/                 # All logos, illustrations, avatars, icons
│   │   └── fonts/               # Local icon fonts (Phosphor, Remix, Lucide, FA)
│   └── *.html                   # 85 flattened standalone HTML files
├── src/                         # Source files
│   ├── assets/                  # Raw assets, fonts, vendor libraries, images
│   ├── js/                      # Modular ES6+ JavaScript
│   │   ├── main.js              # Main application entry point
│   │   └── modules/             # Theme, Sidebar, Header, Search, Apps, Quill
│   ├── layouts/                 # Base layout shells (default, auth, blank)
│   ├── pages/                   # 85 clean HTML source pages
│   ├── partials/                # Reusable HTML partials (head, header, sidebar, footer)
│   └── scss/                    # Modular Dart Sass stylesheets
├── package.json                 # Project manifest & scripts
├── vite.config.mjs              # Custom Vite build & HTML compilation pipeline
└── README.md                    # Primary repository guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) (v18 or v20+ recommended) is installed.

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/xivig/xivig-admin-template-2026.git
cd xivig-admin-template-2026

# Install development dependencies
npm install
```

### 3. Development Mode
Start the Vite dev server with instant HMR and live reload:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Changes in `src/pages/`, `src/scss/`, `src/js/`, or `src/partials/` update live instantly.

### 4. Build Standalone Distribution
Compile and bundle the entire standalone project into `dist/`:
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📑 85-Page Catalog Summary

| Category | Pages | Key Highlights |
| :--- | :---: | :--- |
| **Dashboards** | 6 | Analytics, Sales, CRM, Marketing, Projects, Finance |
| **Interactive Apps** | 7 | Kanban Boards, Event Calendar, Chat, Mail, Contacts, Todo, Support Desk |
| **Enterprise Pages** | 12 | Profile, Preferences, Invoices, Pricing, FAQ, Timeline, Audit Log |
| **User Management** | 4 | Member Directory, User View, User Edit, Roles & Permissions |
| **UI Components** | 16 | Alerts, Modals, Toasts, Badges, Cards, Carousels, Tabs, Accordions |
| **Forms & Editors** | 8 | Standard Controls, Layouts, Client Validation, Multi-step Wizard, Quill v2.0 |
| **Tables** | 3 | Basic Bootstrap Tables, Responsive Wrappers, Simple-DataTables |
| **Charts** | 3 | ApexCharts, Chart.js 4.x, Apache ECharts |
| **Icon Libraries** | 5 | Phosphor (Duotone/Light), Bootstrap, Remix, Lucide, FontAwesome |
| **Modular Widgets** | 5 | Metric Cards, Data Tables, Charts, Mini-Apps, Callout Banners |
| **Auth & Status** | 11 | Login, Register, 2FA, Lockscreen, Password Reset, 404, 500, Maintenance |

*See [`docs/PAGES-CATALOG.md`](docs/PAGES-CATALOG.md) for the complete list of files and descriptions.*

---

## 🌐 Standalone & Offline Support

Every file in `dist/` is completely standalone:
- **No Web Server Required**: Run directly from local disk via `file:///` by double-clicking `dist/index.html`.
- **Zero External Dependencies**: All vendor libraries (Bootstrap 5.3, Quill, ApexCharts, ECharts, Chart.js, Choices.js, Flatpickr, Simple-DataTables) and fonts are bundled locally.
- **Embedded App Ready**: Drop `dist/` directly into **Electron**, **Tauri**, or **Capacitor** to build cross-platform desktop and mobile admin apps.

---

## 📄 License & Credits

- **License**: Released under the [MIT License](LICENSE).
- **Author**: [Xivig Studio](https://github.com/xivig).
- **Core Frameworks**: Bootstrap 5.3, Vite 8, Dart Sass, Quill, ApexCharts.
