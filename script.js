/* ==========================================
   INISIALISASI PETA
========================================== */

const map = L.map('map', {
    zoomControl: true
});

// Koordinat Padukuhan Duwet II
map.setView([-7.6938, 110.2606], 15);


/* ==========================================
   BASEMAP
========================================== */

const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:
    '&copy; OpenStreetMap contributors',
    maxZoom: 22
});

osm.addTo(map);


/* ==========================================
   SCALE BAR
========================================== */

L.control.scale({
    imperial:false
}).addTo(map);


/* ==========================================
   LAYER CONTROL
========================================== */

const baseMaps = {
    "OpenStreetMap": osm
};

const overlayMaps = {};

const layerControl = L.control.layers(
    baseMaps,
    overlayMaps,
    {
        collapsed:false
    }
).addTo(map);
