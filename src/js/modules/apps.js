/**
 * Apps Sidebar Module - Handles sidebars for Chat, Email, Calendar, Kanban, File Manager, Todo, Support
 */
export function initAppsSidebar() {
  const appConfigs = [
    { container: '.email-container', prefix: 'email' },
    { container: '.chat-container', prefix: 'chat' },
    { container: '.contacts-container', prefix: 'contacts' },
    { container: '.calendar-app', prefix: 'calendar' },
    { container: '.file-manager', prefix: 'fm' },
    { container: '.todo-container', prefix: 'todo' },
    { container: '.support-container', prefix: 'support' }
  ];

  let activeConfig = null;
  for (const config of appConfigs) {
    if (document.querySelector(config.container)) {
      activeConfig = config;
      break;
    }
  }

  if (!activeConfig) return;

  const prefix = activeConfig.prefix;
  const sidebar = document.getElementById(`${prefix}Sidebar`);
  const sidebarToggle = document.getElementById(`${prefix}SidebarToggle`);
  const sidebarOverlay = document.getElementById(`${prefix}SidebarOverlay`);
  const sidebarClose = document.getElementById(`${prefix}SidebarClose`);

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('show');
    if (sidebarOverlay) sidebarOverlay.classList.add('show');
    document.body.classList.add(`${prefix}-sidebar-open`);
  }

  function closeSidebar() {
    sidebar.classList.remove('show');
    if (sidebarOverlay) sidebarOverlay.classList.remove('show');
    document.body.classList.remove(`${prefix}-sidebar-open`);
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('show')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });

  const navSelectors = [
    '.email-nav-item', '.chat-item', '.contacts-nav-item',
    '.contacts-group-item', '.calendar-sidebar .card',
    '.fm-nav-item', '.todo-nav-item', '.todo-project-item', '.support-nav-item'
  ];

  navSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => {
      item.addEventListener('click', () => {
        if (window.innerWidth < 1280 && sidebar.classList.contains('show')) {
          closeSidebar();
        }
      });
    });
  });

  window.appSidebar = {
    open: openSidebar,
    close: closeSidebar,
    toggle: () => {
      if (sidebar.classList.contains('show')) closeSidebar();
      else openSidebar();
    }
  };
}
