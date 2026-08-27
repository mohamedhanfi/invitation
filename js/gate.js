(function() {
  'use strict';

  function init() {
    var gate = document.getElementById('gate');
    if (!gate) return;

    document.body.style.overflow = 'hidden';

    function openGate() {
      var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (navigator.vibrate) { try { navigator.vibrate(10); } catch(e) {} }

      if (rm) {
        gate.style.opacity = '0';
        gate.style.transition = 'opacity 0.3s';
        document.body.style.overflow = '';
        setTimeout(function() { gate.style.display = 'none'; }, 300);
        return;
      }

      var starburst = document.querySelector('.gate__starburst');
      if (starburst) starburst.classList.add('gate__starburst--active');

      setTimeout(function() {
        gate.classList.add('gate--hidden');
        document.body.style.overflow = '';
      }, 300);

      setTimeout(function() { gate.style.display = 'none'; }, 900);
    }

    gate.addEventListener('click', openGate);
    gate.setAttribute('tabindex', '0');
    gate.setAttribute('role', 'button');
    gate.setAttribute('aria-label', 'اضغط لفتح الدعوة');
    gate.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGate(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
