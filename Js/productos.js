// products.js

// Array para almacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarProductoAlCarrito(nombre, precio) {
    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo
        carrito.push({
            nombre,
            precio,
            cantidad: 1,
        });
    }

    // Actualizar la lista de productos en el carrito
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Función para actualizar la lista de productos en el carrito
function actualizarCarrito() {
    const listaCarrito = document.querySelector('.lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}
            <button class="quitar-producto" data-nombre="${producto.nombre}">X</button>
        `;

        listaCarrito.appendChild(itemCarrito);
    });
}

// Escuchar eventos en el carrito para quitar productos
const listaCarrito = document.querySelector('.lista-carrito');
listaCarrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('quitar-producto')) {
        const productoNombre = event.target.dataset.nombre;
        const productoExistente = carrito.find(producto => producto.nombre === productoNombre);

        if (productoExistente.cantidad > 1) {
            // Si hay más de uno, disminuir la cantidad
            productoExistente.cantidad--;
        } else {
            // Si solo hay uno, eliminar el producto del carrito
            const productoIndex = carrito.indexOf(productoExistente);
            carrito.splice(productoIndex, 1);
        }

        // Actualizar la lista de productos en el carrito
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }
});

// Cargar datos desde db.json
fetch('/db.json') // Ruta relativa a la raíz del proyecto
    .then(response => response.json())
    .then(data => {
        const productosContainer = document.querySelector('.productos');

        // Recorrer el arreglo de productos y crear elementos HTML
        data.productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto');

        productoElement.innerHTML = `
    <img src="https://forever-life.onrender.com/img/${producto.imagen}" alt="${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <span class="precio">Precio: $${producto.precio.toFixed(2)}</span>
    <button class="agregar-carrito">Agregar al carrito</button>
`;

`;


            // Agregar el elemento del producto al contenedor de productos
            productosContainer.appendChild(productoElement);

            // Agregar evento clic al botón "Agregar al carrito"
            const botonAgregarCarrito = productoElement.querySelector('.agregar-carrito');
            botonAgregarCarrito.addEventListener('click', () => {
                agregarProductoAlCarrito(producto.nombre, producto.precio);
            });
        });
    })
    .catch(error => console.error('Error al cargar los productos:', error));

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
}

// Escuchar evento en el botón "Vaciar Carrito"
const vaciarCarritoBtn = document.querySelector('.vaciar-carrito');
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Función para generar el mensaje de WhatsApp con los productos del carrito
function generarMensajeWhatsApp(productos) {
    let mensaje = 'Buenas tardes, quisiera pedir estos productos:\n';

    productos.forEach(producto => {
        mensaje += `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}\n`;
    });

    return encodeURIComponent(mensaje); // Codificar el mensaje para que se muestre correctamente en el enlace de WhatsApp
}

// Escuchar evento en el botón "Pagar por WhatsApp"
const whatsappBtn = document.querySelector('.whatsapp-button');
whatsappBtn.addEventListener('click', () => {
    const mensajeWhatsApp = generarMensajeWhatsApp(carrito);
    const urlWhatsApp = `https://wa.me/4241801838?text=${mensajeWhatsApp}`;
    window.open(urlWhatsApp, '_blank');
});

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Llamar a actualizarCarrito() para cargar los productos del localStorage
actualizarCarrito();
