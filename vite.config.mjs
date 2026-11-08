import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Helper to activate current page in the sidebar
function activateSidebar(sidebarHtml, activePage) {
  if (!activePage) return sidebarHtml;

  const pageRegex = new RegExp(`(<a\\s+[^>]*href=["'](?:/src/pages/|/)?${activePage}["'][^>]*>)`);
  const match = sidebarHtml.match(pageRegex);
  if (!match) return sidebarHtml;

  const linkTag = match[1];
  const linkIndex = sidebarHtml.indexOf(linkTag);
  let newLinkTag = linkTag;
  if (linkTag.includes('class="')) {
    newLinkTag = linkTag.replace(/class="([^"]*)"/, (m, cls) => {
      const trimmed = cls.trim();
      return `class="${trimmed ? trimmed + ' ' : ''}active"`;
    });
  } else {
    newLinkTag = linkTag.replace('>', ' class="active">');
  }

  const prefix = sidebarHtml.slice(0, linkIndex);

  // Parse open ancestor tags up to linkIndex using accurate stack
  const tagRegex = /<\/?(ul|li)(\s+[^>]*)?>/g;
  const stack = [];
  let m;
  while ((m = tagRegex.exec(prefix)) !== null) {
    const full = m[0];
    const tag = m[1].toLowerCase();
    const isClose = full.startsWith('</');
    if (isClose) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          stack.splice(i, 1);
          break;
        }
      }
    } else {
      stack.push({
        tag,
        full,
        index: m.index,
        isHasSubmenu: tag === 'li' && full.includes('has-submenu'),
        isNavSubmenu: tag === 'ul' && full.includes('nav-submenu')
      });
    }
  }

  const replacements = [];
  replacements.push({
    index: linkIndex,
    length: linkTag.length,
    newText: newLinkTag
  });

  for (const ul of stack.filter(s => s.isNavSubmenu)) {
    const newUl = ul.full.includes('class="')
      ? ul.full.replace(/class="([^"]*)"/, 'class="$1 show"')
      : '<ul class="nav-submenu show">';
    replacements.push({
      index: ul.index,
      length: ul.full.length,
      newText: newUl
    });
  }

  for (const li of stack.filter(s => s.isHasSubmenu)) {
    const newLi = li.full.includes('class="')
      ? li.full.replace(/class="([^"]*)"/, 'class="$1 open"')
      : '<li class="has-submenu open">';
    replacements.push({
      index: li.index,
      length: li.full.length,
      newText: newLi
    });
  }

  // Sort descending by index to prevent offset shifting
  replacements.sort((a, b) => b.index - a.index);

  let result = sidebarHtml;
  for (const r of replacements) {
    result = result.slice(0, r.index) + r.newText + result.slice(r.index + r.length);
  }

  return result;
}

// Recursively resolve <include src="..." />
function resolveIncludes(html, activePage, title, rootDir) {
  const includeRegex = /<include\s+src=["']([^"']+)["']\s*(?:\/>|><\/include>)/g;
  return html.replace(includeRegex, (match, srcPath) => {
    const cleanPath = srcPath.replace(/^\//, '');
    const fullPath = path.resolve(rootDir, cleanPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`[nice-admin] Include not found: ${srcPath}`);
      return `<!-- Include not found: ${srcPath} -->`;
    }
    let content = fs.readFileSync(fullPath, 'utf-8');

    // Dynamic processing
    if (cleanPath.includes('sidebar.html')) {
      content = activateSidebar(content, activePage);
    }
    if (cleanPath.includes('head.html') && title) {
      content = content.replace(/\{\{\s*title\s*\}\}/g, title);
    }

    return resolveIncludes(content, activePage, title, rootDir);
  });
}

// Modular NiceAdmin plugin
function niceAdminModularPlugin() {
  const rootDir = process.cwd();
  const pagesDir = path.resolve(rootDir, 'src', 'pages');

  return {
    name: 'nice-admin-modular-plugin',
    enforce: 'pre',

    // Dev server routing for / and /<page>.html -> /src/pages/<page>.html
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url.split('?')[0];
        const query = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';

        if (urlPath === '/' || urlPath === '/index.html') {
          req.url = '/src/pages/index.html' + query;
        } else if (urlPath.endsWith('.html') && !urlPath.startsWith('/src/pages/')) {
          const pageName = path.basename(urlPath);
          const candidate = path.resolve(pagesDir, pageName);
          if (fs.existsSync(candidate)) {
            req.url = `/src/pages/${pageName}` + query;
          }
        }
        next();
      });
    },

    // Full reload on layout or partial changes
    handleHotUpdate({ file, server }) {
      if (
        file.includes(path.join('src', 'partials')) ||
        file.includes(path.join('src', 'layouts'))
      ) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },

    // Transform HTML templates on request or build
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const layoutRegex = /<layout\s+src=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/layout>/;
        const match = html.match(layoutRegex);
        if (!match) return html;

        const [, layoutSrc, attrsStr, innerContent] = match;

        // Extract attributes
        const titleMatch = attrsStr.match(/title=["']([^"']+)["']/);
        const activeMatch = attrsStr.match(/active=["']([^"']+)["']/);

        const title = titleMatch ? titleMatch[1] : 'NiceAdmin';
        const active = activeMatch ? activeMatch[1] : (ctx.filename ? path.basename(ctx.filename) : 'index.html');

        // Extract slots
        const slots = {};
        let remainingContent = innerContent;

        const slotRegex = /<slot\s+name=["']([^"']+)["'][^>]*>([\s\S]*?)<\/slot>/g;
        let slotMatch;
        while ((slotMatch = slotRegex.exec(innerContent)) !== null) {
          slots[slotMatch[1]] = slotMatch[2];
          remainingContent = remainingContent.replace(slotMatch[0], '');
        }

        slots['content'] = remainingContent.trim();

        // Read layout
        const cleanLayoutPath = layoutSrc.replace(/^\//, '');
        const layoutFullPath = path.resolve(rootDir, cleanLayoutPath);
        if (!fs.existsSync(layoutFullPath)) {
          throw new Error(`Layout file not found: ${layoutSrc}`);
        }

        let layoutHtml = fs.readFileSync(layoutFullPath, 'utf-8');

        // Inject slots
        layoutHtml = layoutHtml.replace(/<slot\s+name=["']([^"']+)["']\s*(?:\/>|><\/slot>)/g, (m, slotName) => {
          return slots[slotName] || '';
        });
        layoutHtml = layoutHtml.replace(/<slot\s*(?:\/>|><\/slot>)/g, () => {
          return slots['content'] || '';
        });

        // Resolve includes
        const finalHtml = resolveIncludes(layoutHtml, active, title, rootDir);
        return finalHtml;
      }
    },

    // Production build post-processing: separate images into dist/assets/img, copy vendor, flatten pages, make standalone
    closeBundle() {
      const distDir = path.resolve(rootDir, 'dist');
      if (!fs.existsSync(distDir)) return;

      const distAssets = path.resolve(distDir, 'assets');
      const distImg = path.resolve(distAssets, 'img');
      const distVendor = path.resolve(distAssets, 'vendor');
      const distCss = path.resolve(distAssets, 'css');

      fs.mkdirSync(distImg, { recursive: true });
      fs.mkdirSync(distVendor, { recursive: true });

      // 1. Copy src/assets/img to dist/assets/img
      const srcImg = path.resolve(rootDir, 'src', 'assets', 'img');
      if (fs.existsSync(srcImg)) {
        fs.cpSync(srcImg, distImg, { recursive: true });
      }

      // 2. Copy src/assets/vendor to dist/assets/vendor
      const srcVendor = path.resolve(rootDir, 'src', 'assets', 'vendor');
      if (fs.existsSync(srcVendor)) {
        fs.cpSync(srcVendor, distVendor, { recursive: true });
      }

      // 3. Move any loose images in dist/assets directly into dist/assets/img
      if (fs.existsSync(distAssets)) {
        const files = fs.readdirSync(distAssets);
        for (const file of files) {
          const fullPath = path.resolve(distAssets, file);
          const stat = fs.statSync(fullPath);
          if (stat.isFile() && /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i.test(file)) {
            fs.renameSync(fullPath, path.resolve(distImg, file));
          }
        }
      }

      // 4. Flatten dist/src/pages/*.html to dist/*.html and normalize paths for standalone execution (no web server needed)
      const distPages = path.resolve(distDir, 'src', 'pages');
      if (fs.existsSync(distPages)) {
        const pages = fs.readdirSync(distPages);
        for (const p of pages) {
          if (p.endsWith('.html')) {
            const pageSrc = path.resolve(distPages, p);
            let content = fs.readFileSync(pageSrc, 'utf-8');

            // Normalize /src/assets/ and /assets/ to relative assets/ preserving quotes
            content = content.replace(/(["'])\/src\/assets\/([^"']+)\1/g, '$1assets/$2$1');
            content = content.replace(/(["'])\/assets\/([^"']+)\1/g, '$1assets/$2$1');

            // Normalize any absolute HTML links /page.html to page.html
            content = content.replace(/(href|src|action)=["']\/([a-zA-Z0-9_-]+\.html)["']/g, '$1="$2"');

            // Convert Vite's module script to classic deferred script for CORS-free file:// protocol support
            content = content.replace(
              /<script\s+type=["']module["']\s+crossorigin\s+src=["'](?:assets|\/assets)\/js\/([^"']+)["']\s*><\/script>/g,
              '<script defer src="assets/js/$1"></script>'
            );

            // Clean up crossorigin on stylesheets
            content = content.replace(
              /<link\s+rel=["']stylesheet["']\s+crossorigin\s+href=["']assets\/css\/([^"']+)["']>/g,
              '<link rel="stylesheet" href="assets/css/$1">'
            );

            fs.writeFileSync(path.resolve(distDir, p), content, 'utf-8');
          }
        }
        // Remove dist/src
        fs.rmSync(path.resolve(distDir, 'src'), { recursive: true, force: true });
      }

      // 5. Fix CSS url() paths so fonts and images are relative to CSS file (../fonts/ and ../img/)
      if (fs.existsSync(distCss)) {
        const cssFiles = fs.readdirSync(distCss);
        for (const f of cssFiles) {
          if (f.endsWith('.css')) {
            const cssPath = path.resolve(distCss, f);
            let cssContent = fs.readFileSync(cssPath, 'utf-8');
            cssContent = cssContent.replace(/url\((["']?)\/assets\/fonts\/([^"')]+)\1\)/g, 'url($1../fonts/$2$1)');
            cssContent = cssContent.replace(/url\((["']?)\/assets\/img\/([^"')]+)\1\)/g, 'url($1../img/$2$1)');
            fs.writeFileSync(cssPath, cssContent, 'utf-8');
          }
        }
      }

      console.log('[nice-admin] Static assets organized into dist/assets/img, paths flattened & standalone.');
    }
  };
}

// Discover all HTML pages in src/pages/ for multi-page build
const rootDir = process.cwd();
const pagesDir = path.resolve(rootDir, 'src', 'pages');
const htmlFiles = fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir).filter(f => f.endsWith('.html')) : [];
const rollupInputs = {};
for (const file of htmlFiles) {
  const name = path.parse(file).name;
  rollupInputs[name] = path.resolve(pagesDir, file);
}

export default defineConfig({
  plugins: [niceAdminModularPlugin()],
  server: {
    port: 5173,
    open: false
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: rollupInputs,
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (/\.(png|jpe?g|gif|svg|webp|ico|avif)$/i.test(name)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  }
});
