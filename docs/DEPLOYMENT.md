# XivigAdmin 2026 - Deployment Guide

XivigAdmin 2026 compiles to a pure, static distribution in `dist/`. It requires no backend runtime, database, or server dependencies, making it deployable on any platform.

---

## 🚀 Deployment Targets

### 1. GitHub Pages (Automated via Actions)

To deploy directly to GitHub Pages, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy XivigAdmin to GitHub Pages

on:
  push:
    branches: [main, xivigadmin]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Standalone Template
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 2. Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel Dashboard](https://vercel.com/new).
3. Configure settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

### 3. Netlify

Create `netlify.toml` in the repository root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 4. Traditional Web Server (Nginx / Apache)

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name admin.yourdomain.com;
    root /var/www/xivig-admin-template-2026/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

---

### 5. 100% Offline / Desktop / Electron Distribution

Because all asset links in `dist/*.html` are normalized to relative `./assets/...` paths:
- You can distribute `dist/` as a ZIP file.
- Users can unzip and double-click `index.html` to open it directly in Chrome, Firefox, Safari, or Edge without running `localhost` or any web server.
- Drop `dist/` directly into **Electron**, **Tauri**, or **Cordova** for instant desktop or mobile app packaging.
