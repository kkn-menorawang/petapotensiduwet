/* INISIALISASI PETA */

const map = L.map('map', {
    zoomControl: true
});

// Koordinat Padukuhan Duwet II
map.setView([-7.6938, 110.2606], 10);


/* BASEMAP*/

const osm = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
    attribution:
    '&copy; OpenStreetMap contributors',
    maxZoom: 22
});

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

map.createPane("batasDesa");
map.getPane("batasDesa").style.zIndex = 300;

map.createPane("batasPadukuhan");
map.getPane("batasPadukuhan").style.zIndex = 301;

map.createPane("sungai");
map.getPane("sungai").style.zIndex = 302;

map.createPane("jalan");
map.getPane("jalan").style.zIndex = 303;

map.createPane("fasilitas");
map.getPane("fasilitas").style.zIndex = 304;

map.createPane("potensi");
map.getPane("potensi").style.zIndex = 305;

map.createPane("landmark");
map.getPane("landmark").style.zIndex = 306;


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
