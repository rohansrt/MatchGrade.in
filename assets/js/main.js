/* YOPPI — shared site behaviour: nav toggle, scroll reveal, footer year */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', links.classList.contains('is-open'));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Offerings dropdown: click to open, close on outside click or Escape */
  var menuItems = document.querySelectorAll('.nav-item.has-menu');

  function closeMenu(item) {
    item.classList.remove('is-open');
    var btn = item.querySelector('.nav-menu-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  menuItems.forEach(function (item) {
    var btn = item.querySelector('.nav-menu-toggle');
    if (!btn) return;

    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      var willOpen = !item.classList.contains('is-open');
      menuItems.forEach(closeMenu);
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    item.querySelectorAll('.nav-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeMenu(item);
      });
    });
  });

  if (menuItems.length) {
    document.addEventListener('click', function (event) {
      menuItems.forEach(function (item) {
        if (!item.contains(event.target)) closeMenu(item);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      menuItems.forEach(function (item) {
        if (!item.classList.contains('is-open')) return;
        closeMenu(item);
        var btn = item.querySelector('.nav-menu-toggle');
        if (btn) btn.focus();
      });
    });
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var header = document.querySelector('.site-header');
  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
