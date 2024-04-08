// servicios.js

// Función para cargar los servicios
function cargarServicios() {
    fetch('/db2.json') // Ruta relativa a la raíz del proyecto
        .then(response => response.json())
        .then(data => {
            const serviciosContainer = document.querySelector('.servicios');

            // Recorrer la lista de servicios y crear elementos HTML
            for (let i = 0; i < data.Servicios.length; i += 2) {
                const servicioGroup = document.createElement('div');
                servicioGroup.classList.add('servicio-group');

                // Crear dos elementos de servicio en cada grupo
                for (let j = i; j < i + 2 && j < data.Servicios.length; j++) {
                    const servicio = data.Servicios[j];
                    const servicioElement = document.createElement('div');
                    servicioElement.classList.add('servicio');

                    // Agregar información del servicio
                    servicioElement.innerHTML = `
                        <img src="/img/servicio${servicio.id}.jpg" alt="${servicio.nombre}">
                        <h2>${servicio.nombre}</h2>
                        <span class="precio">Precio: $${servicio.precio.toFixed(2)}</span>
                    `;

                    // Agregar el elemento del servicio al grupo de servicios
                    servicioGroup.appendChild(servicioElement);
                }

                // Agregar el grupo de servicios al contenedor de servicios
                serviciosContainer.appendChild(servicioGroup);
            }
        })
        .catch(error => console.error('Error al cargar los servicios:', error));
}

// Llamar a la función para cargar los servicios
cargarServicios();

// Función para abrir WhatsApp con mensaje predeterminado
function abrirWhatsAppConMensaje() {
    const mensaje = encodeURIComponent('Buenas quisiera agendar una cita para ');
    window.open(`https://api.whatsapp.com/send?phone=4241801838&text=${mensaje}`);
}
