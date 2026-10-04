// Menú desplegable de "DEXIA KIDS App" (clic, toque y teclado)
document.querySelectorAll('.submenu').forEach(function (item) {
  var boton = item.querySelector('.nav__toggle');
  boton.addEventListener('click', function (e) {
    e.stopPropagation();
    var abierto = item.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', abierto);
  });
  item.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      item.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.focus();
    }
  });
});
document.addEventListener('click', function () {
  document.querySelectorAll('.submenu.abierto').forEach(function (item) {
    item.classList.remove('abierto');
    item.querySelector('.nav__toggle').setAttribute('aria-expanded', 'false');
  });
});
