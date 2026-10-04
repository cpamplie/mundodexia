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
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* ---------- resaltar link activo según la página actual ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[href]').forEach(function (link) {
    var target = link.getAttribute('href').split('/').pop();
    if (target === here) link.classList.add('active');
  });

  /* ---------- tabs (Padres / Profesionales) ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('.tab-btn');
    var panels = group.querySelectorAll('.tab-panel');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var panel = group.querySelector('#' + btn.getAttribute('aria-controls'));
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ---------- formulario de contacto: abre el cliente de mail ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = encodeURIComponent(form.name.value || '');
      var email = form.email.value || '';
      var message = encodeURIComponent(form.message.value || '');
      var subject = encodeURIComponent('DEXIA - Me gustaría recibir más información');
      var body = encodeURIComponent('Nombre: ' + decodeURIComponent(name) + '\n\n' + decodeURIComponent(message) + '\n\n(Responder a: ' + email + ')');
      window.location.href = 'mailto:mundodexia@gmail.com?subject=' + subject + '&body=' + body;
    });
  }

});
