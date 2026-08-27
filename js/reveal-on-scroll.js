(function() {
  'use strict';

  function init() {
    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (rm) {
      document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('revealed'); });
      document.querySelectorAll('.section-divider').forEach(function(el) {
        el.classList.add('section-divider--drawn');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('revealed'); });
      document.querySelectorAll('.section-divider').forEach(function(el) {
        el.classList.add('section-divider--drawn');
      });
      return;
    }

    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var d = entry.target.getAttribute('data-reveal-delay');
        if (d) {
          setTimeout(function() { entry.target.classList.add('revealed'); }, parseInt(d));
        } else {
          entry.target.classList.add('revealed');
        }
        revealObs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(function(el) { revealObs.observe(el); });

    document.querySelectorAll('[data-stagger-group]').forEach(function(group) {
      Array.from(group.children).forEach(function(child, i) {
        child.setAttribute('data-reveal-delay', String(i * 150));
        if (!child.classList.contains('reveal')) child.classList.add('reveal');
        revealObs.observe(child);
      });
    });

    var divObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-divider--drawn');
          divObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -20px 0px', threshold: 0.3 });

    document.querySelectorAll('.section-divider').forEach(function(el) { divObs.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
