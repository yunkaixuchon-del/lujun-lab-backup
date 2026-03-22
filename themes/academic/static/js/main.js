/* =====================================================
   陆俊课题组 - Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Mobile nav toggle ──────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // ─── Active nav link ────────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    }
  });

  // ─── Navbar scroll effect ───────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function handleNavbarScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();
  }

  // ─── Scroll reveal (Intersection Observer) ──────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');
  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el, i) {
      // Stagger delay based on siblings
      el.style.transitionDelay = (i % 6) * 0.08 + 's';
      revealObs.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── Animated counter for stat numbers ──────────────
  function animateCounter(el, target, duration) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target, 1800);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObs.observe(el); });
  }

  // ─── Publication filters ─────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.pub-item').forEach(function (item) {
        if (filter === 'all' || item.dataset.type === filter || item.dataset.year === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ─── Smooth scroll for anchor links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

});
