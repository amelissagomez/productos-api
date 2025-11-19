const API_URL = 'http://localhost:8080/productos';

window.onload = cargarProductos;

function cargarProductos() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => mostrarProductos(data))
    .catch(error => {
      console.error('Error cargando productos:', error);
      mostrarMensaje('Error al cargar productos', 'error');
    });
  limpiarMensaje();
}

function mostrarProductos(productos) {
  const tabla = document.getElementById('tablaProductos');
  tabla.innerHTML = '';

  if (productos.length === 0) {
    tabla.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay productos</td></tr>';
    return;
  }

  productos.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>$${parseFloat(p.precio).toFixed(2)}</td>
        <td>${p.cantidadDisponible}</td>
        <td>${p.descripcion || '-'}</td>
        <td>${p.categoria || '-'}</td>
      </tr>
    `;
  });
}

function buscarPorId() {
  const id = document.getElementById('idInput').value.trim();

  if (id === '') {
    mostrarMensaje('Ingresa un ID', 'error');
    return;
  }

  fetch(`${API_URL}/${id}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detalle || 'Error en la búsqueda');
        });
      }
      return response.json();
    })
    .then(data => {
      mostrarProductos([data]);
      mostrarMensaje(`Producto encontrado: ${data.nombre}`, 'success');
    })
    .catch(error => {
      console.error('Error:', error);
      mostrarMensaje(error.message, 'error');
    });
}

function buscarPorCategoria() {
  const categoria = document.getElementById('categoriaSelect').value.trim();

  if (categoria === '') {
    mostrarMensaje('Selecciona una categoría', 'error');
    return;
  }

  fetch(`${API_URL}/categoria/${categoria}`)
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detalle || 'Error en la búsqueda');
        });
      }
      return response.json();
    })
    .then(data => {
      mostrarProductos(data);
      mostrarMensaje(`Se encontraron ${data.length} productos en la categoría "${categoria}"`, 'success');
    })
    .catch(error => {
      console.error('Error:', error);
      mostrarMensaje(error.message, 'error');
    });
}

function crearProducto() {
  const nombre = document.getElementById('nombre').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const descripcion = document.getElementById('descripcion').value.trim();
  const categoria = document.getElementById('categoria').value.trim();

  if (!nombre || !precio || !cantidad || !categoria) {
    mostrarMensaje('Completa todos los campos obligatorios', 'error');
    return;
  }

  if (isNaN(precio) || precio <= 0) {
    mostrarMensaje('El precio debe ser un número mayor que 0', 'error');
    return;
  }

  if (isNaN(cantidad) || cantidad < 0) {
    mostrarMensaje('La cantidad debe ser un número no negativo', 'error');
    return;
  }

  const producto = {
    nombre,
    precio,
    cantidadDisponible: cantidad,
    descripcion: descripcion || null,
    categoria
  };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(producto)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.detalle || 'Error al crear producto');
        });
      }
      return response.json();
    })
    .then(data => {
      mostrarMensaje(`Producto "${data.nombre}" creado exitosamente`, 'success');
      limpiarFormulario();
      cargarProductos();
    })
    .catch(error => {
      console.error('Error:', error);
      mostrarMensaje(error.message, 'error');
    });
}

function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function limpiarMensaje() {
  document.getElementById('mensaje').textContent = '';
  document.getElementById('mensaje').className = '';
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('cantidad').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('categoria').value = '';
}
