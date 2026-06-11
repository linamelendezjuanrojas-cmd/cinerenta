// Catalogo
function verCategoria(nombre, boton) {
  document.querySelectorAll('.categoria').forEach(c => c.classList.remove('activa'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('activo'));
  document.getElementById('cat-' + nombre).classList.add('activa');
  boton.classList.add('activo');
}

//  Reservar
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[name="pelicula"]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      const marcadas = document.querySelectorAll('input[name="pelicula"]:checked');
      if (marcadas.length > 3) {
        this.checked = false;
        Swal.fire({ title: 'Error', text: 'Solo puedes seleccionar máximo 3 películas.', icon: 'error' });
      }
    });
  });
});

function limpiarFormulario() {
  ['nombre', 'edad', 'direccion'].forEach(id => document.getElementById(id).value = '');
  document.querySelectorAll('input[name="sexo"], input[name="pelicula"]').forEach(i => i.checked = false);
}

function enviar() {
  const nombre    = document.getElementById('nombre').value.trim();
  const edad      = document.getElementById('edad').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const sexo      = document.querySelector('input[name="sexo"]:checked');
  const peliculas = document.querySelectorAll('input[name="pelicula"]:checked');

  const validaciones = [
    [nombre === '',          'El nombre no puede estar vacío.'],
    [/[0-9]/.test(nombre),  'El nombre no debe contener números.'],
    [edad === '',            'La edad no puede estar vacía.'],
    [parseInt(edad) < 18,   'Debes tener 18 años o más para reservar.'],
    [direccion === '',       'La dirección no puede estar vacía.'],
    [!sexo,                  'Debes seleccionar una opción de sexo.'],
    [peliculas.length === 0, 'Debes seleccionar al menos 1 película.'],
    [peliculas.length > 3,   'No puedes seleccionar más de 3 películas.'],
  ];

  for (const [condicion, mensaje] of validaciones) {
    if (condicion) {
      Swal.fire({ title: 'Error', text: mensaje, icon: 'error' });
      return; 
    }
  }

  const datos = new FormData();
  datos.append('nombre', nombre);
  datos.append('edad', edad);
  datos.append('direccion', direccion);
  datos.append('sexo', sexo.value);
  peliculas.forEach(p => datos.append('peliculas[]', p.value));

  fetch('guardar.php', { method: 'POST', body: datos })
    .then(r => r.json())
    .then(function (data) {
      if (data.exito) {
        Swal.fire({ title: 'Reserva guardada', icon: 'success', draggable: true });
        limpiarFormulario();
      } else {
        Swal.fire({ title: 'Error', text: 'Hubo un error al guardar. Intenta de nuevo.', icon: 'error' });
      }
    })
    .catch(function () {
      Swal.fire({ title: 'Error', text: 'No se pudo conectar con el servidor.', icon: 'error' });
    });
}

// Reportes
function cargarReporte() {
  fetch('reportes.php')
    .then(r => r.json())
    .then(function (data) {
      document.getElementById('num-total').textContent = data.total;
      document.getElementById('resultado').style.display = 'block';

      const ahora = new Date();
      document.getElementById('fecha-consulta').textContent =
        'Consultado el ' + ahora.toLocaleDateString('es-CO') + ' a las ' + ahora.toLocaleTimeString('es-CO');

      const cuerpo = document.getElementById('cuerpo-tabla');
      const tabla  = document.getElementById('tabla-solicitudes');

      if (data.solicitudes && data.solicitudes.length > 0) {
        cuerpo.innerHTML = data.solicitudes.map((s, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${s.nombre}</td>
            <td>${s.edad}</td>
            <td>${s.sexo}</td>
            <td>${s.peliculas}</td>
            <td>${s.fecha}</td>
          </tr>`).join('');
        tabla.style.display = 'table';
      } else {
        tabla.style.display = 'none';
      }
    })
    .catch(function () {
      Swal.fire({ title: 'Error', text: 'No se pudo conectar con el servidor.', icon: 'error' });
    });
}