var mapa = L.map("Contenedor_del_mapa").setView([24, -101], 4.5);

// Capa OSM
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(mapa);

// Delimitación de Estados y marcador
var marcador = L.marker([19.3276039, -99.1809175]).addTo(mapa);

// Interacción con el mapa
function highlightFeature(e) {
    var layer = e.target;

    // Restablecer el estilo predeterminado
    layer.setStyle({
        weight: 2,
        opacity: 1,
        fillOpacity: 0.4,
    });
}

function resetHighlight(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        dashArray: '',
        fillOpacity: 0,
    });

    layer.bringToFront();
}

function zoomToFeature(e) {
    mapa.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: resetHighlight,
        mouseout: highlightFeature,
        click: zoomToFeature,
    });
}

// Cargar y estilizar el archivo KML
var Estatal = omnivore.kml("./data/esta_ine.kml")
    .on('ready', function() {
        this.eachLayer(function(layer) {
            // Aplicar estilo a cada capa (estado)
            layer.setStyle({
                weight: 2,
                opacity: 1,
                fillOpacity: 0.4,
            });

            // Asociar eventos de interacción
            onEachFeature(null, layer);
        });
        mapa.fitBounds(this.getBounds());
    })
    .addTo(mapa);



// Capas Google map
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Control de Capas (Layers Control)
var baseLayers = {
    "OpenStreetMap": osm,
    "Satelital": googleSat,
    "Google maps": googleStreets
};

var overlays = {
    "Marker": marcador
};

L.control.layers(baseLayers, overlays).addTo(mapa);