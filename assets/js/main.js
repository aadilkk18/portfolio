/* Shared behaviour for every page:
   theme toggle, mobile menu, project cards (from projects.js), scroll reveal, spotlight hover, footer year, visit counter. */
(function () {
  var root = document.documentElement;
  var THEME_KEY = 'portfolio-theme';

  /* ---------- SETTINGS ---------- */
  // GoatCounter site code, e.g. 'aadilkk18' (gives aadilkk18.goatcounter.com). Leave '' until you have signed up.
  var GOATCOUNTER_CODE = 'aadilkk18';

  /* ---------- Theme ---------- */
  // Remember the visitor's theme choice (safe if storage is blocked).
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  var themeBtn = document.getElementById('theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu');
  var links = document.getElementById('nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('open') && !links.contains(e.target) && !menuBtn.contains(e.target)) {
        links.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Project cards ----------
     Data lives in assets/js/projects.js. A page opts in by adding an empty container:
       <div class="grid2" data-projects="all"></div>        every project
       <div class="grid2" data-projects="featured"></div>   only featured:true (Home)
     and <body data-root=""> on pages in the site root, <body data-root="../"> on pages inside /projects/. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var PILL_ICON = { done: '✓', live: '', dev: '', paused: '' };
  var prefix = document.body.getAttribute('data-root') || '';

  function logoTile(p) {
    var cls = 'logo-tile ' + (p.tile === 'dark' ? 'dark' : 'light');
    var letter = esc((p.name || '?').charAt(0).toUpperCase());
    if (!p.logo) return '<span class="' + cls + ' letter" aria-hidden="true">' + letter + '</span>';
    return '<span class="' + cls + '" aria-hidden="true">' +
      '<img src="' + esc(prefix + p.logo) + '" alt="" loading="lazy" decoding="async" data-letter="' + letter + '"></span>';
  }

  function card(p, index, opts) {
    var h = opts.heading;
    var text = opts.short && p.short ? p.short : p.desc;
    var num = ('0' + (index + 1)).slice(-2);
    var chips = (p.chips || []).map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('');
    return '<a class="proj2 reveal" href="' + esc(prefix + p.page) + '" style="--i:' + index + '">' +
      '<div class="proj2-top">' +
        '<div class="proj2-id">' + logoTile(p) + (opts.numbers ? '<span class="num">' + num + '</span>' : '') + '</div>' +
        '<span class="pill ' + esc(p.status) + '"><i aria-hidden="true">' + (PILL_ICON[p.status] || '') + '</i>' + esc(p.statusLabel) + '</span>' +
      '</div>' +
      '<' + h + '>' + esc(p.name) + '</' + h + '>' +
      '<p class="kicker">' + esc(p.kicker) + '</p>' +
      '<p class="desc">' + esc(text) + '</p>' +
      '<div class="chips">' + chips + '</div>' +
      '<span class="go">Read the case study <b>→</b></span>' +
    '</a>';
  }

  function renderProjects() {
    var data = window.PROJECTS;
    var boxes = document.querySelectorAll('[data-projects]');
    if (!data || !boxes.length) return;
    boxes.forEach(function (box) {
      var featured = box.getAttribute('data-projects') === 'featured';
      var list = featured ? data.filter(function (p) { return p.featured; }) : data;
      box.innerHTML = list.map(function (p, i) {
        return card(p, i, { heading: featured ? 'h3' : 'h2', short: featured, numbers: !featured });
      }).join('');
    });

    // If a logo file is missing or fails to load, fall back to a letter tile instead of a broken image.
    document.querySelectorAll('.logo-tile img').forEach(function (img) {
      img.addEventListener('error', function () {
        var tile = img.parentNode;
        tile.classList.add('letter');
        tile.textContent = img.getAttribute('data-letter') || '?';
      });
    });
  }

  /* ---------- Spotlight: the glow follows the cursor (not on touch screens or with reduced motion) ---------- */
  function spotlight() {
    if (!window.matchMedia('(hover:hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    document.querySelectorAll('.proj2').forEach(function (cardEl) {
      cardEl.addEventListener('pointermove', function (e) {
        var r = cardEl.getBoundingClientRect();
        cardEl.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        cardEl.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Scroll reveal (content stays visible if IntersectionObserver is missing) ---------- */
  function reveal() {
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('in'); });
    }
  }

  // Order matters: cards must exist before the reveal observer and spotlight look for them.
  renderProjects();
  spotlight();
  reveal();

  /* ---------- Visit counter (GoatCounter: no cookies, no personal data) ---------- */
  var host = location.hostname;
  var isLocal = host === 'localhost' || host === '127.0.0.1' || host === '' || host === '[::1]';
  if (GOATCOUNTER_CODE && !isLocal) {
    var gc = document.createElement('script');
    gc.async = true;
    gc.src = 'https://gc.zgo.at/count.js';
    gc.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
    document.head.appendChild(gc);
  }
})();