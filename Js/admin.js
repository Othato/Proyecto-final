document.addEventListener('DOMContentLoaded', () => {
    const listaProductos = document.getElementById('lista-productos');
    const listaServicios = document.getElementById('lista-servicios');
    const formularioProductos = document.getElementById('formulario-productos');
    const formularioServicios = document.getElementById('formulario-servicios');

    function agregarElementoALista(lista, nombre, precio) {
        const nuevoElemento = document.createElement('li');
        nuevoElemento.innerHTML = `
            ${nombre} - $${precio}
            <button class="editar">Editar</button>
            <button class="eliminar">Eliminar</button>
        `;

        nuevoElemento.querySelector('.editar').addEventListener('click', () => {
            const nuevoNombre = prompt('Nuevo nombre:', nombre);
            const nuevoPrecio = parseFloat(prompt('Nuevo precio:', precio));

            if (nuevoNombre !== null && nuevoNombre !== '' && !isNaN(nuevoPrecio)) {
                nuevoElemento.innerHTML = `
                    ${nuevoNombre} - $${nuevoPrecio.toFixed(2)}
                    <button class="editar">Editar</button>
                    <button class="eliminar">Eliminar</button>
                `;

                // Actualizar localStorage para productos o servicios
                if (lista === listaProductos) {
                    actualizarLocalStorageProductos();
                } else {
                    actualizarLocalStorageServicios();
                }
            }
        });

        nuevoElemento.querySelector('.eliminar').addEventListener('click', () => {
            nuevoElemento.remove();

            // Actualizar localStorage para productos o servicios
            if (lista === listaProductos) {
                actualizarLocalStorageProductos();
            } else {
                actualizarLocalStorageServicios();
            }
        });

        lista.appendChild(nuevoElemento);
    }

    function actualizarLocalStorageProductos() {
        const productos = [];

        listaProductos.querySelectorAll('li').forEach(elemento => {
            const partes = elemento.textContent.split(' - $');
            const nombre = partes[0];
            const precio = parseFloat(partes[1]);
            productos.push({ nombre, precio });
        });

        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function actualizarLocalStorageServicios() {
        const servicios = [];

        listaServicios.querySelectorAll('li').forEach(elemento => {
            const partes = elemento.textContent.split(' - $');
            const nombre = partes[0];
            const precio = parseFloat(partes[1]);
            servicios.push({ nombre, precio });
        });

        localStorage.setItem('servicios', JSON.stringify(servicios));
    }

    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    productosGuardados.forEach(producto => {
        agregarElementoALista(listaProductos, producto.nombre, producto.precio);
    });

    const serviciosGuardados = JSON.parse(localStorage.getItem('servicios')) || [];
    serviciosGuardados.forEach(servicio => {
        agregarElementoALista(listaServicios, servicio.nombre, servicio.precio);
    });

    formularioProductos.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreProducto').value;
        const precio = parseFloat(document.getElementById('precioProducto').value);

        if (nombre && !isNaN(precio)) {
            agregarElementoALista(listaProductos, nombre, precio);
            formularioProductos.reset();
            actualizarLocalStorageProductos();
        }
    });

    formularioServicios.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreServicio').value;
        const precio = parseFloat(document.getElementById('precioServicio').value);

        if (nombre && !isNaN(precio)) {
            agregarElementoALista(listaServicios, nombre, precio);
            formularioServicios.reset();
            actualizarLocalStorageServicios();
        }
    });
});
