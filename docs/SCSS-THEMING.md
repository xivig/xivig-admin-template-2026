# XivigAdmin 2026 - SCSS Architecture & Theming Guide

XivigAdmin is powered by modern **Dart Sass** (`sass-embedded`) and dynamic CSS custom properties (variables), providing instantaneous runtime theme toggling and rapid brand customization.

---

## 🎨 Color Palette & Design Tokens

Theme tokens are defined in [`src/scss/_variables.scss`](file:///e:/0.2027-project/nice-admin-template/src/scss/_variables.scss) and exposed as CSS variables on `:root` and `[data-theme="dark"]`.

### 1. Brand & Accent Tokens
| Variable | Hex Value | Purpose |
| :--- | :--- | :--- |
| `--primary-color` | `#4f46e5` | Core brand color (Deep Electric Indigo) |
| `--accent-color` | `#6366f1` | Highlights, active navigation, focus rings, hover states |
| `--success-color` | `#10b981` | Positive states, connected dots, success badges |
| `--warning-color` | `#f59e0b` | Alerts, pending statuses, warnings |
| `--danger-color` | `#f43f5e` | Destructive actions, sign out, overdue badges |
| `--info-color` | `#06b6d4` | Informational callouts, secondary metrics |

### 2. Surface & Background Tokens

#### Light Mode (`:root`)
```css
--background-color: #f8fafc;
--surface-color: #ffffff;
--default-color: #334155;
--heading-color: #0f172a;
--muted-color: #64748b;
--border-color: #e2e8f0;
--border-color-light: #f1f5f9;
--sidebar-bg: #ffffff;
--sidebar-color: #334155;
--sidebar-border: #e2e8f0;
```

#### Cosmic Dark Mode (`[data-theme="dark"]`)
```css
--background-color: #070a13;
--surface-color: #0d1322;
--default-color: #cbd5e1;
--heading-color: #f8fafc;
--muted-color: #94a3b8;
--border-color: #1e293b;
--border-color-light: #162032;
--sidebar-bg: #090e1a;
--sidebar-color: #cbd5e1;
--sidebar-border: #1e293b;
```

---

## 🌙 Dark Mode Mechanics

The dark mode engine is implemented in [`src/js/modules/theme.js`](file:///e:/0.2027-project/nice-admin-template/src/js/modules/theme.js):
- Reads the user's stored preference from `localStorage.getItem('xivig-theme')`.
- If no stored preference exists, automatically detects OS preference via `window.matchMedia('(prefers-color-scheme: dark)')`.
- Toggles the `data-theme="dark"` attribute on the root `<html>` element.
- Seamlessly switches header theme toggle icons (`ph-sun` / `ph-moon-stars`).

---

## 📏 Ultra-Slim Floating Scrollbars

XivigAdmin features an ultra-refined, floating pill scrollbar design:
- **Global Width**: `4px` (down from standard browser 12px-16px).
- **Sidebar Width**: `3px` with seamless transparent background track.
- **Illumination**: On hover, the scrollbar thumb illuminates with an Electric Indigo gradient (`linear-gradient(180deg, #6366f1, #8b5cf6)`).
- **Cross-Browser Engine**: Configured with `@supports not selector(::-webkit-scrollbar)` to eliminate Chromium 121+ standard scrollbar collisions while preserving Firefox compatibility.

---

## ✍️ Customizing Typography

Fonts are imported via Google Fonts in `src/partials/head.html`:
- **Interface Body**: Plus Jakarta Sans
- **Headings & Badges**: Outfit
- **Code & Quantities**: JetBrains Mono

To change the typography, update the CSS variables in `src/scss/_variables.scss`:
```scss
--default-font: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
--heading-font: "Outfit", sans-serif;
--monospace-font: "JetBrains Mono", monospace;
```
