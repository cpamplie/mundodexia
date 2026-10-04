// DEXIA KIDS — interacciones compartidas

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close when clicking a non-dropdown link
    nav.querySelectorAll('a:not(.nav-parent):not(.dropdown a)').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* ---------- dropdowns en móvil (toggle al tocar el nav-parent) ---------- */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var parent = item.querySelector('.nav-parent');
    if (!parent) return;
    parent.addEventListener('click', function (e) {
      // en mobile (nav visible como panel) interceptar el clic para abrir dropdown
      if (window.innerWidth <= 880) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  /* ---------- resaltar link activo según la página actual ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[href]').forEach(function (link) {
    var target = link.getAttribute('href').split('/').pop().split('#')[0];
    if (target === here) link.classList.add('active');
  });

  /* ---------- tabs (Padres / Profesionales) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('.tab-btn');
    var panels = group.querySelectorAll('.tab-panel');

    function activateTab(btn) {
      buttons.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      var panel = group.querySelector('#' + btn.getAttribute('aria-controls'));
      if (panel) panel.classList.add('active');
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { activateTab(btn); });
    });

    // activar tab por URL hash (#padres → tab-familias, #profesionales → tab-profesionales)
    var hash = location.hash.replace('#', '');
    var map = { padres: 'tab-familias', profesionales: 'tab-profesionales' };
    var targetId = map[hash] || hash;
    var targetBtn = group.querySelector('[aria-controls="' + targetId + '"]');
    if (targetBtn) {
      activateTab(targetBtn);
      setTimeout(function () {
        group.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  });

  /* ---------- formulario de contacto: abre el cliente de mail ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value || '';
      var email = form.email.value || '';
      var message = form.message.value || '';
      var subject = encodeURIComponent('DEXIA - Me gustaría recibir más información');
      var body = encodeURIComponent('Nombre: ' + name + '\n\n' + message + '\n\n(Responder a: ' + email + ')');
      window.location.href = 'mailto:mundodexia@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

});
