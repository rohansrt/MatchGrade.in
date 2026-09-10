/* YOPPI — offerings page: audience tabs with shareable #hash deep links */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  if (!tabs.length || !panels.length) return;

  function panelFor(tab) {
    return document.getElementById(tab.getAttribute('aria-controls'));
  }

  function select(tab, options) {
    var opts = options || {};

    tabs.forEach(function (t) {
      var isCurrent = t === tab;
      t.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      t.tabIndex = isCurrent ? 0 : -1;
      var panel = panelFor(t);
      if (panel) panel.hidden = !isCurrent;
    });

    var active = panelFor(tab);
    if (active) {
      // Replay the reveal animation for the panel the visitor just opened.
      active.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    if (opts.updateHash !== false) {
      var id = tab.dataset.audience;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + id);
      } else {
        window.location.hash = id;
      }
    }

    if (opts.focus) tab.focus();
    if (opts.scroll && active) {
      var top = active.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      select(tab, { scroll: true });
    });

    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, { focus: true });
      }
    });
  });

  function tabFromHash() {
    var id = (window.location.hash || '').replace('#', '');
    if (!id) return null;
    return tabs.filter(function (t) {
      return t.dataset.audience === id;
    })[0] || null;
  }

  select(tabFromHash() || tabs[0], { updateHash: false });

  window.addEventListener('hashchange', function () {
    var tab = tabFromHash();
    if (tab) select(tab, { updateHash: false, scroll: true });
  });
})();
