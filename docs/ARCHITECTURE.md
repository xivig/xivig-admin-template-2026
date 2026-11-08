# XivigAdmin 2026 - Architecture & Build Pipeline

## Overview

**XivigAdmin 2026** is built on a modern frontend architecture designed for maximum developer velocity, modularity, and zero runtime overhead. Unlike legacy admin templates that depend on jQuery, Gulp, or heavy server-side templating engines, XivigAdmin uses **Vite 8**, **pure ES6+ modules**, and **Dart Sass**.

---

## 🏗️ High-Level Architecture

```
[ Developer Workflow ]
       │
       ├─► src/pages/*.html          (Clean, semantic HTML templates)
       ├─► src/layouts/*.html        (Standard, auth, and blank layout shells)
       ├─► src/partials/*.html       (Re-usable header, sidebar, footer components)
       ├─► src/scss/**/*.scss        (35+ modular Dart Sass stylesheets)
       └─► src/js/main.js            (ES6+ entry point with zero jQuery)
       │
   [ Vite Build Engine (vite.config.mjs) ]
       │
       ├─► Recursive include resolution (<include src="..." />)
       ├─► Layout nesting (<layout src="..." />)
       ├─► Intelligent Sidebar Auto-Activation (AST tag analysis)
       ├─► SCSS compilation & variable tokenization
       ├─► Standalone path rewriting & asset flattening
       │
   [ Production Output (dist/) ]
       │
       ├─► 85 Flattened standalone HTML files (runs directly via file:///)
       ├─► dist/assets/css/main-[hash].css
       ├─► dist/assets/js/main-[hash].js
       └─► dist/assets/img/* (organized image assets)
```

---

## ⚡ The Templating & Inclusion System

XivigAdmin uses a lightweight, lightning-fast build-time include and layout parser configured in `vite.config.mjs`.

### 1. Partial Inclusion (`<include src="..." />`)
Reusable snippets such as headers, sidebars, footers, and scripts are defined in `src/partials/` and included using custom HTML tags:

```html
<include src="/src/partials/head.html" />
<include src="/src/partials/header.html" />
<include src="/src/partials/sidebar.html" />
<include src="/src/partials/footer.html" />
<include src="/src/partials/scripts.html" />
```

### 2. Layout Wrapping (`<layout src="..." />`)
Pages can either declare direct includes or wrap inside layout templates:
- `src/layouts/default.html` - Standard admin layout with Header, Sidebar, and Footer.
- `src/layouts/auth.html` - Centered, distraction-free authentication layout.
- `src/layouts/blank.html` - Minimal shell for landing or standalone pages.

### 3. Intelligent Sidebar Accordion Auto-Activation
In `vite.config.mjs`, the custom `activateSidebar(sidebarHtml, activePage)` function parses HTML tags using an accurate stack:
- Detects the current page's matching `<a>` tag.
- Adds `class="active"` to the current page link.
- Traverses the ancestor stack to automatically mark parent `<ul class="nav-submenu show">` and `<li class="has-submenu open">` tags.
- Ensures all submenus remain properly collapsed except the one containing the active route.

---

## 🎨 Modular Styling Pipeline (Dart Sass)

Styles are structured using modern `@use` rules without deprecated `@import`:

```
src/scss/
├── main.scss               # Main entry stylesheet
├── _variables.scss         # Design tokens, color palette, dimensions & scrollbars
├── _base.scss              # Typography, resets, body styles
├── _overrides.scss         # Bootstrap 5 overrides
├── components/             # 14 UI component partials (buttons, cards, forms, etc.)
├── layouts/                # Header, Sidebar, Footer, Main, Auth layout styles
├── pages/                  # Dashboard, Apps, Users, Widgets, and Error page styles
└── utils/                  # Dark mode, helpers, print styles
```

### Key Design Tokens
- `--primary-color: #4f46e5;`
- `--accent-color: #6366f1;`
- `--surface-color: #ffffff;` (Light) / `#0d1322;` (Dark)
- `--background-color: #f8fafc;` (Light) / `#070a13;` (Dark)
- `--sidebar-width: 280px;`
- `--header-height: 64px;`

---

## 📦 Standalone & Offline Architecture (`dist/`)

One of the defining innovations of XivigAdmin is its **100% Standalone `dist/` Output**:
1. **Zero Web Server Requirement**: Every page in `dist/` can be opened directly by double-clicking or loading via the `file:///` protocol in any browser.
2. **Flattened Page Layout**: All 85 pages reside directly at `dist/*.html`, eliminating nested relative path resolution issues.
3. **Relative Asset Paths**: All script, style, font, and image links are normalized to `./assets/...` relative paths.
4. **Isolated Media Directory**: All images are cleanly placed in `dist/assets/img/`.

---

## 🔒 Security & Performance Guidelines

- **Zero External CDNs Required**: All fonts (Phosphor, Remixicon, Lucide, FontAwesome, Bootstrap Icons) and vendor scripts (ApexCharts, Quill, Chart.js, Simple-Datatables, Flatpickr, Choices.js) are bundled locally.
- **Strict Content Security Policy (CSP) Friendly**: No inline eval scripts; fully compatible with modern enterprise CSP policies.
