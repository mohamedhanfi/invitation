(function() {
  'use strict';

  var EVENT_DATE = new Date('2026-09-14T19:00:00+02:00');
  var prev = { days: null, hours: null, minutes: null, seconds: null };

  function pad(n) { return String(n).padStart(2, '0'); }

  function getRemaining() {
    var diff = EVENT_DATE - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    return {
      days: Math.floor(diff / 864e5),
      hours: Math.floor((diff / 36e5) % 24),
      minutes: Math.floor((diff / 6e4) % 60),
      seconds: Math.floor((diff / 1e3) % 60),
      total: diff
    };
  }

  function update() {
    var t = getRemaining();
    var ids = ['countdown-days', 'countdown-hours', 'countdown-minutes', 'countdown-seconds'];
    var vals = [t.days, t.hours, t.minutes, t.seconds];
    var keys = ['days', 'hours', 'minutes', 'seconds'];
    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    for (var i = 0; i < 4; i++) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      if (prev[keys[i]] !== vals[i]) {
        el.textContent = pad(vals[i]);
        if (!rm) {
          el.classList.remove('countdown__number--flip');
          void el.offsetWidth;
          el.classList.add('countdown__number--flip');
        }
        prev[keys[i]] = vals[i];
      }
    }

    if (t.total === 0) {
      var c = document.querySelector('.countdown');
      if (c) c.innerHTML = '<p style="font-family:var(--font-display);font-size:var(--fs-h3);color:var(--gold)">بارك الله لكما وبارك عليكما وجمع بينكما في خير</p>';
    }
  }

  function init() { update(); setInterval(update, 1000); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
