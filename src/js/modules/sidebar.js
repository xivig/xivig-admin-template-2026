/**
 * Sidebar Module - Handles desktop toggle, mobile drawer, overlay, and collapsible navigation
 */

export function openSubmenu(parent) {
  if (!parent) return;
  parent.classList.add('open');
  const submenu = parent.querySelector('.nav-submenu');
  if (submenu) {
    submenu.classList.add('show');
  }
  const link = parent.querySelector('.nav-link');
  if (link) {
    link.setAttribute('aria-expanded', 'true');
  }
}

export function closeSubmenu(parent) {
  if (!parent) return;
  parent.classList.remove('open');
  const submenu = parent.querySelector('.nav-submenu');
  if (submenu) {
    submenu.classList.remove('show');
  }
  const link = parent.querySelector('.nav-link');
  if (link) {
    link.setAttribute('aria-expanded', 'false');
  }
  // Also close any nested open submenus inside this parent
  const nestedOpen = parent.querySelectorAll('.has-submenu.open');
  nestedOpen.forEach((item) => {
    item.classList.remove('open');
    const sub = item.querySelector('.nav-submenu');
    if (sub) sub.classList.remove('show');
    const lnk = item.querySelector('.nav-link');
    if (lnk) lnk.setAttribute('aria-expanded', 'false');
  });
}

export function initSidebarNav() {
  const sidebarNavRoot = document.querySelector('.sidebar-nav');
  if (!sidebarNavRoot) return;

  // Use event delegation on sidebarNavRoot for 100% reliable click handling
  sidebarNavRoot.addEventListener('click', function(e) {
    const link = e.target.closest('.has-submenu > .nav-link');
    if (!link) return;

    // Only intercept if this link toggles a submenu
    const parent = link.closest('.has-submenu');
    if (!parent) return;

    e.preventDefault();
    const isOpen = parent.classList.contains('open');

    if (isOpen) {
      // If currently open, collapse it
      closeSubmenu(parent);
    } else {
      // Accordion: close all other open submenus in the entire sidebar that are not ancestors of this one!
      const allOpen = sidebarNavRoot.querySelectorAll('.has-submenu.open');
      allOpen.forEach((item) => {
        if (!item.contains(parent)) {
          closeSubmenu(item);
        }
      });

      // Open the clicked submenu
      openSubmenu(parent);
    }
  });

  // Auto-expand active submenus on page load
  const activeItems = sidebarNavRoot.querySelectorAll('.nav-submenu .nav-link.active');
  activeItems.forEach((activeItem) => {
    let parent = activeItem.closest('.has-submenu');
    while (parent) {
      openSubmenu(parent);
      parent = parent.parentElement.closest('.has-submenu');
    }
  });
}

export function initSidebar() {
  const body = document.body;
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebarClose = document.querySelector('.sidebar-close');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.innerWidth >= 1200) {
        body.classList.toggle('sidebar-hidden');
      } else {
        body.classList.toggle('sidebar-open');
      }
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', (e) => {
      e.preventDefault();
      body.classList.remove('sidebar-open');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      body.classList.remove('sidebar-open');
    });
  }

  if (window.innerWidth >= 1200) {
    body.classList.remove('sidebar-hidden');
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 1200) {
        body.classList.remove('sidebar-open');
      }
    }, 250);
  });

  initSidebarNav();
}
