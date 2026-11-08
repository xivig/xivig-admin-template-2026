/**
 * Header Module - Dropdown Hover Management
 * Supports desktop on-hover trigger with debounce delay and Bootstrap 5 compatibility.
 */
export function initHeaderDropdowns() {
  const dropdownWraps = document.querySelectorAll('.header-action-wrap.dropdown');

  dropdownWraps.forEach((wrap) => {
    const trigger = wrap.querySelector('[data-bs-toggle="dropdown"]');
    if (!trigger) return;

    let timeout = null;

    const show = () => {
      if (window.innerWidth < 992) return;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      if (window.bootstrap && window.bootstrap.Dropdown) {
        const bsDropdown = window.bootstrap.Dropdown.getOrCreateInstance(trigger);
        bsDropdown.show();
      }
    };

    const hide = () => {
      if (window.innerWidth < 992) return;
      timeout = setTimeout(() => {
        if (window.bootstrap && window.bootstrap.Dropdown) {
          const bsDropdown = window.bootstrap.Dropdown.getInstance(trigger);
          if (bsDropdown) {
            bsDropdown.hide();
          }
        }
      }, 180);
    };

    wrap.addEventListener('mouseenter', show);
    wrap.addEventListener('mouseleave', hide);

    const menu = wrap.querySelector('.dropdown-menu');
    if (menu) {
      menu.addEventListener('mouseenter', () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
      });
      menu.addEventListener('mouseleave', hide);
    }
  });
}
