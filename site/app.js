/* Renders the shack from projects.js. No dependencies, no build step. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function link(href, text) {
    var a = el('a', null, text);
    a.href = href;
    if (/^https?:/.test(href)) { a.rel = 'noopener'; }
    return a;
  }

  /* ---- featured cards ---- */

  function renderCards(list, mount) {
    list.forEach(function (p) {
      var li = el('li', 'card');

      var top = el('div', 'card-top');
      var h3 = el('h3', 'card-name');
      h3.appendChild(link(p.href, p.name));
      top.appendChild(h3);

      var st = p.status || 'live';
      var label = { live: 'in stock', wip: 'on the bench', cold: 'cold storage' }[st] || st;
      top.appendChild(el('span', 'status status-' + st, label));
      li.appendChild(top);

      li.appendChild(el('p', 'card-blurb', p.blurb));

      var chips = el('ul', 'chips');
      if (p.lang) chips.appendChild(el('li', 'chip chip-lang', p.lang));
      (p.tags || []).forEach(function (t) { chips.appendChild(el('li', 'chip', t)); });
      li.appendChild(chips);

      mount.appendChild(li);
    });
  }

  /* ---- back room rows ---- */

  function renderRows(list, mount) {
    list.forEach(function (p) {
      var li = el('li', 'row');
      var name = el('span', 'row-name');
      name.appendChild(link(p.href, p.name));
      li.appendChild(name);
      li.appendChild(el('span', 'row-blurb', p.blurb));
      li.appendChild(el('span', 'row-lang', p.lang || ''));
      mount.appendChild(li);
    });
  }

  /* ---- comms ---- */

  function renderComms(list, mount) {
    list.forEach(function (c) {
      var li = el('li', 'comm');

      if (c.icon) {
        var img = el('img');
        img.src = c.icon;
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.width = 20; img.height = 20;
        li.appendChild(img);
      } else {
        var g = el('span', 'glyph', '◈');
        g.setAttribute('aria-hidden', 'true');
        li.appendChild(g);
      }

      var text = el('span', 'comm-text');
      text.appendChild(el('span', 'comm-name', c.name));
      var handle = el('span', 'comm-handle');
      handle.appendChild(link(c.href, c.handle));
      text.appendChild(handle);
      li.appendChild(text);

      mount.appendChild(li);
    });
  }

  /* ---- title glitch: once on load, then on hover ---- */

  function wireGlitch() {
    var title = document.querySelector('.title');
    if (!title || reduced) return;

    function fire() {
      title.classList.remove('glitching');
      void title.offsetWidth;            // restart the animation
      title.classList.add('glitching');
    }
    title.addEventListener('mouseenter', fire);
    setTimeout(fire, 700);
  }

  /* ---- boot lines type themselves in ---- */

  function wireBoot() {
    var lines = Array.prototype.slice.call(document.querySelectorAll('.boot-line'));
    if (!lines.length || reduced) return;

    lines.forEach(function (l, i) {
      l.style.opacity = '0';
      setTimeout(function () {
        l.style.transition = 'opacity .18s ease';
        l.style.opacity = '1';
      }, 120 * i);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderCards(typeof FEATURED !== 'undefined' ? FEATURED : [], document.getElementById('cards'));
    renderRows(typeof BACK_ROOM !== 'undefined' ? BACK_ROOM : [], document.getElementById('stack'));
    renderComms(typeof COMMS !== 'undefined' ? COMMS : [], document.getElementById('comms-list'));
    wireBoot();
    wireGlitch();
  });
})();
