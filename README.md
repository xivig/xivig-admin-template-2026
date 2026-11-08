# NiceAdmin - Modular SCSS & ES6+ Bootstrap 5 Admin Dashboard Template

A modern, component-driven, modular version of the **NiceAdmin Bootstrap 5 Admin Template** with a fast **Vite** development environment, **Dart Sass (SCSS)** styling, modular **ES6+ JavaScript (Zero jQuery)**, and **Quill Rich Text Editor**.

---

## 🌟 Key Highlights

- **📁 Clean Folder Hierarchy**: All 85 template pages are located in `src/pages/`, all assets reside in `src/assets/`, and the build compiles cleanly to `dist/` with a dedicated `dist/assets/img/` folder for images.
- **⚡ Lightning-Fast Dev Server**: Powered by Vite with instant Hot Module Replacement (HMR) and live reload.
- **🎨 Modular SCSS Architecture**: Replaced monolithic CSS with 28 structured Dart Sass (`.scss`) modules in `src/scss/` with `@use` rules, CSS custom property theming, and dark mode.
- **📜 Modular ES6+ JavaScript**: Clean, modern ES module architecture in `src/js/` (zero jQuery) with dedicated modules for theme, sidebar, search, back-to-top, tooltips, apps, and Quill.
- **✍️ Quill Editor Integration**: Completely stripped out TinyMCE and standardized on the modern, lightweight **Quill Editor** (Snow, Bubble, Advanced Document, and Inline variants).
- **🧹 Clean & Optimized Repository**: Removed monolithic backup duplicates, stripped unused vendor libraries, and kept all 85 modular pages lean and component-driven.
- **🎯 Automated Sidebar Navigation**: Active navigation links and parent collapse menus automatically open and highlight based on the current page.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. Any edit to SCSS, JS, layouts, or partials updates instantly with live reload!

### 3. Build for Production
```bash
npm run build
```
Compiles all 85 pages from `src/pages/` to `dist/*.html`, bundles modular SCSS into optimized CSS (`dist/assets/css/`), bundles scripts into `dist/assets/js/`, and isolates all images into `dist/assets/img/`.

All HTML files in `dist/` are **100% standalone and flattened**: all paths are relative (`assets/...`), scripts use deferred loading without CORS restrictions, and pages can be run directly from local disk (by double-clicking `dist/index.html` via `file:///`) without requiring a web server.

### 4. Preview Production Build (Optional)
```bash
npm run preview
```

---

## 📁 Project Architecture

```plaintext
nice-admin-template/
├── src/
│   ├── pages/                   # All 85 Modular HTML Pages
│   │   ├── index.html           # Main Dashboard
│   │   ├── dashboard-*.html     # Dashboard variants (Sales, CRM, Analytics, etc.)
│   │   ├── apps-*.html          # App pages (Calendar, Chat, Kanban, Email, Contacts, etc.)
│   │   ├── forms-*.html         # Form pages (Elements, Editors, Wizards, Pickers, etc.)
│   │   ├── tables-*.html        # Table pages (DataTables, Responsive, Basic)
│   │   ├── charts-*.html        # Chart pages (ApexCharts, ECharts, Chart.js)
│   │   ├── components-*.html    # UI Component pages (Modals, Toasts, Dropdowns, etc.)
│   │   ├── icons-*.html         # Icon sets (Bootstrap, Lucide, Phosphor, FontAwesome, Remix)
│   │   ├── auth-*.html          # Authentication pages (Login, Register, 2FA, Reset, etc.)
│   │   ├── error-*.html         # Error pages (404, 500, 403, Maintenance, etc.)
│   │   └── ...                  # Profile, Users, Settings, Invoices, Pricing, etc.
│   ├── assets/                  # Source Static Assets
│   │   ├── img/                 # Avatars, banners, cards, blog, products, flags, gallery, slides
│   │   └── vendor/              # Bootstrap 5, Quill, ApexCharts, Flatpickr, Choices, Icon fonts
│   ├── scss/                    # Modular SCSS Architecture (Dart Sass)
│   │   ├── main.scss            # Main stylesheet entry point
│   │   ├── _variables.scss      # Colors, typography, spacing, light & dark palettes
│   │   ├── _base.scss           # Resets, typography, scrollbars, animations
│   │   ├── _overrides.scss      # Bootstrap, DataTables, and Chart overrides
│   │   ├── layouts/             # _header.scss, _sidebar.scss, _footer.scss, _main.scss, _auth.scss
│   │   ├── components/          # _accordion.scss, _buttons.scss, _cards.scss, _forms.scss, _quill.scss, etc.
│   │   ├── pages/               # _dashboard.scss, _widgets.scss, _users.scss, _pages.scss, _errors.scss
│   │   └── utils/               # _helpers.scss, _dark.scss, _print.scss
│   ├── js/                      # Modular ES6+ JavaScript (Zero jQuery)
│   │   ├── main.js              # Application entry point
│   │   └── modules/
│   │       ├── theme.js         # Dark/light theme switcher and local storage persistence
│   │       ├── sidebar.js       # Desktop collapse, mobile drawer, overlay, submenu handler
│   │       ├── search.js        # Header search toggle & mobile menu
│   │       ├── back-to-top.js   # Scroll detector & smooth scroll to top
│   │       ├── tooltips.js      # Native Bootstrap 5 tooltips & popovers
│   │       ├── apps.js          # App sidebar drawer for Chat, Email, Kanban, etc.
│   │       └── quill.js         # Quill editor initialization & helpers
│   ├── layouts/
│   │   ├── default.html         # Main dashboard layout
│   │   ├── auth.html            # Authentication layout
│   │   └── error.html           # Error pages layout
│   └── partials/
│       ├── head.html            # Links to /src/scss/main.scss, fonts, favicons
│       ├── header.html          # Top navigation bar
│       ├── sidebar.html         # Collapsible sidebar navigation
│       ├── footer.html          # Dashboard footer
│       ├── footer-auth.html     # Auth footer
│       └── scripts.html         # Loads /src/js/main.js & core vendor bundles
├── dist/                        # Production build output
│   ├── *.html                   # 85 static HTML pages
│   └── assets/
│       ├── css/                 # Compiled & minified CSS
│       ├── js/                  # Bundled & minified ES modules
│       ├── img/                 # Dedicated image folder (all images and subfolders)
│       ├── fonts/               # Web fonts (WOFF2/WOFF)
│       └── vendor/              # Local vendor packages
├── package.json
└── vite.config.mjs              # Multi-page compiler with pre-transform & image segregation
```

---

## ✍️ Quill Rich Text Editor

TinyMCE has been completely removed and replaced with **Quill Editor**:
- **Snow Theme**: Full WYSIWYG toolbar with headers, formatting, colors, lists, code blocks, and media embeds.
- **Bubble Theme**: Contextual inline tooltip for floating formatting.
- **Document Editor**: Dedicated document card with clear and HTML export actions.
- **Compact Editor**: Minimalist setup for messages, comments, and notes.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Launch the Vite development server with instant HMR and live reload |
| `npm run build` | Compile all 85 modular pages and SCSS into production-ready `dist/` |
| `npm run preview` | Run a local HTTP server to preview the production build |
