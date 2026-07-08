/**
 * Axomock Docs — Client-side JavaScript
 * Handles sidebar active state and smooth scrolling.
 */

(function () {
  'use strict';

  // Smooth scroll on sub-nav click
  const subNavLinks = document.querySelectorAll('.docs-sub-nav-link');
  subNavLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        // Scroll considering fixed header (if any, rough estimate ~80px)
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Update URL hash without jumping
        history.pushState(null, null, '#' + id);
      }
    });
  });

  // Mobile sidebar toggle
  const sidebar = document.getElementById('docsSidebar');
  if (sidebar && window.innerWidth <= 768) {
    sidebar.style.maxHeight = '0';
    sidebar.style.overflow = 'hidden';
    sidebar.style.transition = 'max-height 0.3s ease';

    // Create toggle button
    const toggle = document.createElement('button');
    toggle.textContent = '📚 Toggle docs menu';
    toggle.className = 'btn btn-ghost btn-sm';
    toggle.style.cssText = 'width:100%;border-bottom:1px solid var(--slate-200);border-radius:0;';
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.style.maxHeight !== '0px';
      sidebar.style.maxHeight = isOpen ? '0' : '50vh';
      sidebar.style.overflow = isOpen ? 'hidden' : 'auto';
    });

    sidebar.parentElement.insertBefore(toggle, sidebar);
  }
})();
