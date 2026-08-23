// Scroll-triggered reveal animation.
// Adds staggered fade/slide-in to any element with class="reveal"
// as it enters the viewport. Also cascades the home page index list
// and hero banner title/credit on load.
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // stagger delay per sibling group (banner + index list get a cascade)
  var groupCounters = {};
  els.forEach(function (el) {
    var group = el.dataset.revealGroup || el.parentElement;
    var key = el.dataset.revealGroup || null;
    var count;
    if (key) {
      groupCounters[key] = (groupCounters[key] || 0) + 1;
      count = groupCounters[key] - 1;
    } else {
      count = 0;
    }
    el.style.transitionDelay = (count * 70) + 'ms';
  });

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { io.observe(el); });

  // banner title/credit reveal immediately on load, not on scroll
  document.querySelectorAll('.hero-banner .reveal').forEach(function (el) {
    io.unobserve(el);
    requestAnimationFrame(function () {
      setTimeout(function () { el.classList.add('is-visible'); }, 60);
    });
  });
})();
