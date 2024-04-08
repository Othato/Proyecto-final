document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('mapa').setView([10.505899, -66.915963], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([10.505899, -66.915963]).addTo(map)
        .bindPopup('Forever Life A.G.')
        .openPopup();
});
