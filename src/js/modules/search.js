/**
 * Search & Mobile Header Menu Module
 */
export function initSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  const mobileSearch = document.querySelector('.mobile-search');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileHeaderMenu = document.querySelector('.mobile-header-menu');
  const searchInput = mobileSearch ? mobileSearch.querySelector('input') : null;

  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileHeaderMenu && mobileHeaderMenu.classList.contains('active')) {
        mobileHeaderMenu.classList.remove('active');
      }
      mobileSearch.classList.toggle('active');
      if (mobileSearch.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
  }

  if (mobileMenuToggle && mobileHeaderMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileSearch && mobileSearch.classList.contains('active')) {
        mobileSearch.classList.remove('active');
      }
      mobileHeaderMenu.classList.toggle('active');
    });
  }

  document.addEventListener('click', (e) => {
    if (mobileSearch && !mobileSearch.contains(e.target) && !searchToggle.contains(e.target)) {
      mobileSearch.classList.remove('active');
    }
    if (mobileHeaderMenu && mobileMenuToggle && !mobileHeaderMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileHeaderMenu.classList.remove('active');
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (mobileSearch) mobileSearch.classList.remove('active');
      if (mobileHeaderMenu) mobileHeaderMenu.classList.remove('active');
    }
  });
}
