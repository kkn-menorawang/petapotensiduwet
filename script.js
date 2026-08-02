/* INISIALISASI PETA */

const map = L.map('map', {
    zoomControl: true
});

// Koordinat Padukuhan Duwet II
map.setView([-7.6938, 110.2606], 20);


/* BASEMAP*/

const osm = L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:'© OpenStreetMap contributors',
    maxZoom:22
});

const satellite = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
    attribution:'© Esri'
});

const carto = L.tileLayer(
'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
{
    attribution:'© CARTO'
});

// Basemap default
osm.addTo(map);


/* SCALE BAR */

L.control.scale({
    imperial:false
}).addTo(map);


/*  LAYER CONTROL*/

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


/* PANE*/

map.createPane("BatasKabKota");
map.getPane("BatasKabKota").style.zIndex = 300;

map.createPane("BatasKecamatan");
map.getPane("BatasKecamatan").style.zIndex = 301;

map.createPane("BatasKelurahan");
map.getPane("BatasKelurahan").style.zIndex = 302;

map.createPane("BatasPadukuhan");
map.getPane("BatasPadukuhan").style.zIndex = 303;

map.createPane("AirTerjun");
map.getPane("AirTerjun").style.zIndex = 304;

map.createPane("Jembatan");
map.getPane("Jembatan").style.zIndex = 305;

map.createPane("CacingSutra");
map.getPane("CacingSutra").style.zIndex = 306;

map.createPane("Lele");
map.getPane("Lele").style.zIndex = 307;

map.createPane("Dukuh");
map.getPane("Dukuh").style.zIndex = 308;

map.createPane("Mushola");
map.getPane("Mushola").style.zIndex = 309;

map.createPane("Sekolah");
map.getPane("Sekolah").style.zIndex = 310;

map.createPane("UMKM");
map.getPane("UMKM").style.zIndex = 311;

map.createPane("Domba");
map.getPane("Domba").style.zIndex = 312;

map.createPane("Kambing");
map.getPane("Kambing").style.zIndex = 313;


/*LOAD GEOJSON*/

function loadGeoJSON(url, options, layerName){

    fetch(url)

    .then(response => response.json())

    .then(data => {

        const layer = L.geoJSON(data, options);

        layer.addTo(map);

        overlayMaps[layerName] = layer;

        layerControl.addOverlay(layer, layerName);

    })

    .catch(error => {

        console.error("Gagal memuat :", url);

    });

}


loadGeoJSON(
"data/jalan.geojson",
{
    pane:"jalan",

    style:{
        color:"#555",
        weight:2
    }

},
"Jalan"
);



fetch("data/batas_padukuhan.geojson")
.then(r=>r.json())
.then(data=>{

    const batas = L.geoJSON(data);

    map.fitBounds(batas.getBounds());

});
