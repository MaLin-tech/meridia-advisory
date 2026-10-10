// ============================================================
// Meridia Advisory — Interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initMobileMenu();
  initScrollReveal();
  initSmoothScroll();
});

// ----- Navigation scroll state -----
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ----- Mobile menu -----
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

// ----- Scroll reveal -----
function initScrollReveal() {
  const revealTargets = document.querySelectorAll(
    '.section-header, .service-card, .approach-item, .market-item, .insight-card, .visual-frame, .cta-content'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 400));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach(el => observer.observe(el));
}

// ----- Smooth scroll with offset -----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = 76;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    });
  });
}
