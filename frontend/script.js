const API_URL = "http://localhost:8080/productos";

// Cargar productos al iniciar
window.onload = cargarProductos;

// Función mostrar mensaje
function mensaje(texto) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
}

// Función cargar producto al inicio
function cargarProductos() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => mostrarProductos(data))
    .catch((error) => console.error("Error cargando productos:", error));
}

// Función para mostrar productos en la tabla
function mostrarProductos(productos) {
  const tabla = document.getElementById("productos");
  tabla.innerHTML = "";

  productos.forEach((p) => {
    tabla.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.cantidadDisponible}</td>
            <td>${p.categoria}</td>
          </tr>
        `;
  });
}

// Función para mostrar todos los productos filtrados por Id
function mostrarTablaFiltroId(data, id) {
  const tabla = document.getElementById("tablaProductoFiltrado");
  const tablaFiltrada = document.getElementById("productoFiltrado");
  tablaFiltrada.innerHTML = "";

  if (!data || data.status === 404) {
    tabla.hidden = true;
    tablaFiltrada.innerHTML = "";
    mensaje(`Producto con Id ${id} no encontrado`);
    return;
  }
  tabla.hidden = false;
  tablaFiltrada.innerHTML += `
          <tr>
            <td>${data.id}</td>
            <td>${data.nombre}</td>
            <td>${data.precio}</td>
            <td>${data.cantidadDisponible}</td>
            <td>${data.categoria}</td>
          </tr>
        `;
  document.getElementById("mensaje").textContent = "";
}

// Función para mostrar los productos filtrados por Categoria
function mostrarTablaFiltroCategoria(data) {
  const tabla = document.getElementById("tablaProductoFiltrado");
  const tablaFiltrada = document.getElementById("productoFiltrado");
  tablaFiltrada.innerHTML = "";

  if (!data || data.length === 0) {
    tabla.hidden = true;
    tablaFiltrada.innerHTML = "";
    mensaje("No hay productos en esta categoría");
    return;
  }
  data.forEach((p) => {
    tabla.hidden = false;
    tablaFiltrada.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.precio}</td>
            <td>${p.cantidadDisponible}</td>
            <td>${p.categoria}</td>
          </tr>
        `;
  });

  document.getElementById("mensaje").textContent = "";
}

// Función para buscar producto por Id
function buscarProductoId() {
  const id = document.getElementById("idInput").value.trim();
  if (id == "") {
    mensaje("Ingresa un Id");
    return;
  }
  fetch(`${API_URL}/${id}`)
    .then((response) => response.json())
    .then((data) => mostrarTablaFiltroId(data, id))
    .catch((error) => {
      console.error("Error buscando producto por Id:", error);
      mensaje("Producto no encontrado");
    });
}

// Función para buscar productos por categoria
function buscarPorCategoria() {
  const categoria = document.getElementById("valueCategoria").value.trim();

  if (categoria === "") {
    mensaje("Selecciona una categoría");
    return;
  }

  fetch(`${API_URL}/categoria/${categoria}`)
    .then((response) => response.json())
    .then((data) => mostrarTablaFiltroCategoria(data))
    .catch((error) => {
      console.error("Error buscando productos por categoría:", error);
      mensaje("No se encontraron productos para la categoría seleccionada");
    });
}
