(function() {
  'use strict';

  function init() {
    /* Enabled only on fine pointers (desktop) and when the user has NOT
       asked for reduced motion. Disabled on touch/coarse pointers to
       avoid janky scrolling and battery drain. */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    var hero = document.getElementById('hero');
    if (!hero || !window.requestAnimationFrame) return;

    /* Parallax target: the ::before layer that carries the hero background.
       It is oversized (top: -12%, height: 124%) so translating it downward
       by up to ~12% of the hero height never reveals an edge. */
    var strength = 0.12;
    var maxShift = 0;
    var ticking = false;

    function measure() {
      maxShift = Math.max(8, hero.offsetHeight * 0.12);
    }

    function update() {
      ticking = false;
      var rect = hero.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      /* As the page scrolls (scrollY grows) the hero moves up; we shift the
         background layer DOWN by a fraction of that scroll so it appears to
         lag behind the content (classic parallax), capped so no edge shows. */
      var y = Math.min(window.pageYOffset * strength, maxShift);
      hero.style.setProperty('--parallax-y', y + 'px');
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
