/* INISIALISASI PETA */

const map = L.map('map', {
    zoomControl: true
});


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

const groupedOverlays = {};

const layerControl = L.control.groupedLayers(

    baseMaps,

    groupedOverlays,

    {
        collapsed:true
    }

).addTo(map);


/* LEGEND*/

const legend = L.control({
    position: "bottomleft"
});

legend.onAdd = function (map) {

    const div = L.DomUtil.create("div", "legend collapsed");

    div.innerHTML = `

    <div class="legend-title">
        📖 Legenda
    </div>

    <div class="legend-content">

        <b>Potensi</b>

        <div><img src="assets/icons/Kambing.png"> Peternakan Kambing</div>
        <div><img src="assets/icons/Domba.png"> Peternakan Domba</div>
        <div><img src="assets/icons/Lele.png"> Budidaya Lele</div>
        <div><img src="assets/icons/Cacing_Sutra.png"> Budidaya Cacing Sutra</div>
        <div><img src="assets/icons/UMKM.png"> UMKM</div>

        <hr>

        <b>Fasilitas</b>

        <div><img src="assets/icons/Sekolah.png"> Sekolah</div>
        <div><img src="assets/icons/Mushola.png"> Mushola</div>
        <div><img src="assets/icons/Padukuhan.png"> Rumah Kepala Dukuh</div>

        <hr>

        <b>Landmark</b>

        <div><img src="assets/icons/Jembatan.png"> Jembatan</div>
        <div><img src="assets/icons/Air_Terjun.png"> Air Terjun</div>

        <hr>

        <b>Batas Administrasi</b>

        <div><span class="line kab"></span> Kabupaten/Kota</div>
        <div><span class="line kec"></span> Kecamatan</div>
        <div><span class="line kel"></span> Kelurahan</div>
        <div><span class="line pad"></span> Padukuhan</div>

    </div>

    `;

    div.onclick = function(){

        div.classList.toggle("collapsed");

    };

    return div;

};

legend.addTo(map);


/* MARKER CLUSTER */

const clusterPotensi = L.markerClusterGroup({

    showCoverageOnHover:false,
    spiderfyOnMaxZoom:true,
    disableClusteringAtZoom:17

});

const clusterFasilitas = L.markerClusterGroup({

    showCoverageOnHover:false,
    spiderfyOnMaxZoom:true,
    disableClusteringAtZoom:17

});

const clusterLandmark = L.markerClusterGroup({

    showCoverageOnHover:false,
    spiderfyOnMaxZoom:true,
    disableClusteringAtZoom:17

});

map.addLayer(clusterPotensi);
map.addLayer(clusterFasilitas);
map.addLayer(clusterLandmark);


/* PANE*/

map.createPane("BatasKabKota");
map.getPane("BatasKabKota").style.zIndex = 300;

map.createPane("BatasKecamatan");
map.getPane("BatasKecamatan").style.zIndex = 301;

map.createPane("BatasKelurahan");
map.getPane("BatasKelurahan").style.zIndex = 302;

map.createPane("BatasPadukuhan");
map.getPane("BatasPadukuhan").style.zIndex = 303;

map.createPane("Potensi");
map.getPane("Potensi").style.zIndex = 304;

map.createPane("Fasilitas");
map.getPane("Fasilitas").style.zIndex = 305;

map.createPane("Landmark");
map.getPane("Landmark").style.zIndex = 306;


/*  ICON */

const KambingIcon = L.icon({
    iconUrl: "assets/icons/Kambing.png",
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0,-30]
});

const DombaIcon = L.icon({
    iconUrl: "assets/icons/Domba.png",
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0,-30]
});

const LeleIcon = L.icon({
    iconUrl: "assets/icons/Lele.png",
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0,-30]
});

const CacingSutraIcon = L.icon({
    iconUrl: "assets/icons/Cacing_Sutra.png",
    iconSize: [32,32],
    iconAnchor: [16,32],
    popupAnchor: [0,-30]
});

const UMKMIcon = L.icon({
    iconUrl: "assets/icons/UMKM.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

const AirTerjunIcon = L.icon({
    iconUrl: "assets/icons/Air_Terjun.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

const JembatanIcon = L.icon({
    iconUrl: "assets/icons/Jembatan.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

const DukuhIcon = L.icon({
    iconUrl: "assets/icons/Padukuhan.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

const MusholaIcon = L.icon({
    iconUrl: "assets/icons/Mushola.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

const SekolahIcon = L.icon({
    iconUrl: "assets/icons/Sekolah.png",
    iconSize: [30,30],
    iconAnchor: [15,30],
    popupAnchor: [0,-28]
});

/* POPUP */

function createPopup(feature, title, fields){

    const p = feature.properties;

    let html = `<div class="popup-content">`;

    // FOTO
    if(p.Foto){

        html += `
        <img
            src="${p.Foto}"
            alt="${title}"
            class="popup-image">
        `;

    }

    // JUDUL
    html += `<h3>${title}</h3>`;

    // TABEL
    html += `<table class="popup-table">`;

    fields.forEach(field=>{

        html += `
        <tr>
            <th>${field.label}</th>
            <td>${p[field.name] ?? "-"}</td>
        </tr>
        `;

    });

    html += `</table>`;

    // TOMBOL GOOGLE MAPS
    if(p.GoogleMaps){

        html += `
        <a href="${p.GoogleMaps}"
           target="_blank"
           class="popup-button">

           📍 Buka di Google Maps

        </a>
        `;

    }

    html += `</div>`;

    return html;

}


/*LOAD GEOJSON*/

function loadLayer(url, options, layerName, cluster = null,  groupName = "Lainnya") {

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Gagal memuat ${url}`);
            }

            return response.json();

        })

        .then(data => {

            const layer = L.geoJSON(data, options);

            // Jika memakai cluster
            if(cluster){

                cluster.addLayer(layer);

            }else{

                layer.addTo(map);

            }

            overlayMaps[layerName] = layer;

            layerControl.addOverlay(layer, layerName);

        })

        .catch(error => {

            console.error(error);

        });

}


loadLayer(
    "data/Batas_KabKota.geojson",
    {
        pane: "BatasKabKota",

        style: {
           color:"#616161",
           weight:1,
           opacity:0.8,
           dashArray:"8 6",
           fillOpacity:0
        },

        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Batas Kabupaten / Kota",

                  [
                    {name:"NAMOBJ",label:"Kelurahan"},
                    {name:"WADMKC",label:"Kecamatan"},
                    {name:"WADMKK",label:"Kabupaten/kota"},
                    {name:"WADMPR",label:"Provinsi"}
                 ] 

           ));

      }

    },
    "Batas Kab Kota",
    
    null,

    "Batas Administrasi"

);

loadLayer(
    "data/Batas_Kecamatan.geojson",
    {
        pane: "BatasKecamatan",

        style: {
           color:"#757575",
           weight:1.5,
           opacity:0.9,
           dashArray:"6 4",
           fillOpacity:0
        },

        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Batas Kecamatan",

                  [
                    {name:"NAMOBJ",label:"Kelurahan"},
                    {name:"WADMKC",label:"Kecamatan"},
                    {name:"WADMKK",label:"Kabupaten/kota"},
                    {name:"WADMPR",label:"Provinsi"}
                 ] 

           ));

      }

    },
    "Batas Kecamatan",
    
    null,

    "Batas Administrasi"

);

loadLayer(
    "data/Batas_Kelurahan.geojson",
    {
        pane: "BatasKelurahan",

        style: {
           color:"#FB8C00",
           weight:2,
           opacity:1,
           dashArray:"4 4",
           fillOpacity:0
        },

        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Batas Kelurahan",

                  [
                    {name:"NAMOBJ",label:"Kelurahan"},
                    {name:"WADMKC",label:"Kecamatan"},
                    {name:"WADMKK",label:"Kabupaten/kota"},
                    {name:"WADMPR",label:"Provinsi"}
                 ] 

           ));

      }

    },
    "Batas Kelurahan",
    
    null,

    "Batas Administrasi"

);

loadLayer(
    "data/Batas_Padukuhan.geojson",
    {
        pane: "BatasPadukuhan",

        style: {
           color:"#FB8C00",
           weight:2,
           opacity:1,
           dashArray:"4 4",
           fillOpacity:0
        },

        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Batas Padukuhan",

                  [
                    {name:"NAMOBJ",label:"Padukuhan"},
                    {name:"WADMKD",label:"Kelurahan"},
                    {name:"WADMKC",label:"Kecamatan"},
                    {name:"WADMKK",label:"Kabupaten/kota"},
                    {name:"WADMPR",label:"Provinsi"}
                 ] 

           ));

      }

    },
    "Batas Padukuhan",
    
    null,

    "Batas Administrasi"

);

loadLayer(
    "data/Air_Terjun.geojson",
    {

        pane:"Landmark",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:AirTerjunIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Air Terjun",

                  [
                    {name:"Nama",label:"Nama"},
                    {name:"Deskripsi",label:"Deskripsi"}
                 ] 

           ));

      }

    },
    "Air Terjun",  
    
    clusterLandmark,

    "Landmark"

);

loadLayer(
    "data/Jembatan.geojson",
    {

        pane:"Landmark",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:JembatanIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Jembatan",

                  [
                    {name:"Nama",label:"Nama"},
                    {name:"Deskripsi",label:"Deskripsi"}
                 ] 

           ));

      }

    },
    "Jembatan",
    
    clusterLandmark,

    "Landmark"

);

loadLayer(
    "data/Cacing_Sutra.geojson",
    {

        pane:"Potensi",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:CacingSutraIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Cacing Sutra",

                  [
                    {name:"Nama",label:"Nama"}
                 ] 

           ));

      }

    },
    "Budidaya Cacing Sutra",
    
    clusterPotensi,

    "Potensi"

);

loadLayer(
    "data/Lele.geojson",
    {

        pane:"Potensi",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:LeleIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Lele",

                  [
                    {name:"Nama",label:"Nama"}
                 ] 

           ));

      }

    },
    "Budidaya Lele",
    
    clusterPotensi,

    "Potensi"

);

loadLayer(
    "data/Dukuh.geojson",
    {

        pane:"Fasilitas",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:DukuhIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Rumah Kepala Dukuh",

                  [
                    {name:"Nama",label:"Nama"},
                    {name:"Jabatan",label:"Jabatan"}
                 ] 

           ));

      }

    },

    "Dukuh",
    
    clusterFasilitas

);

loadLayer(
    "data/Mushola.geojson",
    {

        pane:"Fasilitas",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:MusholaIcon
               });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Mushola",

                  [
                    {name:"Nama",label:"Nama"}                 ] 

           ));

      }

    },

    "Mushola",
    
    clusterFasilitas,

    "Fasilitas"

);

loadLayer(
    "data/Sekolah.geojson",
    {

        pane:"Fasilitas",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:SekolahIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Sekolah",

                  [
                    {name:"Nama",label:"Nama"}
                 ] 

           ));

      }

    },


    "Sekolah",
    
    clusterFasilitas,

    "Fasilitas"

);

loadLayer(
    "data/UMKM.geojson",
    {

        pane:"Potensi",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:UMKMIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "UMKM",

                  [
                    {name:"Name",label:"Nama"},
                    {name:"Jenis",label:"Jenis"},
                    {name:"Produk",label:"Produk"},
                    {name:"Deskripsi",label:"Deskripsi"}
                 ] 

           ));

      }

    },

    "UMKM",
    
    clusterPotensi,

    "Potensi"

);

loadLayer(
    "data/Domba.geojson",
    {

        pane:"Potensi",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:DombaIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "Peternakan Domba",

                  [
                    {name:"Nama",label:"Nama"},
                    {name:"Jumlah",label:"Jumlah Ternak"},
                    {name:"Sistem",label:"Sistem"},
                    {name:"Pakan",label:"Pakan"},
                    {name:"Vaksin",label:"Vaksin"},
                    {name:"ObatCacing",label:"Obat Cacing"}
                 ] 

           ));

      }

    },
    "Domba",
    
    clusterPotensi,

    "Potensi"

);

loadLayer(
    "data/Kambing.geojson",
    {

        pane:"Potensi",

        pointToLayer:function(feature, latlng){

            return L.marker(latlng,{
                icon:KambingIcon
            });

        },
    
        onEachFeature:function(feature,layer){

          layer.bindPopup(

              createPopup(
  
                  feature,

                  "🐐 Peternakan Kambing",

                  [
                    {name:"Nama",label:"Nama"},
                    {name:"Jumlah",label:"Jumlah Ternak"},
                    {name:"Sistem",label:"Sistem"},
                    {name:"Pakan",label:"Pakan"},
                    {name:"Vaksin",label:"Vaksin"},
                    {name:"ObatCacing",label:"Obat Cacing"}
                 ] 

           ));

      }

    },
    "Kambing",
    
    clusterPotensi,

    "Potensi"

);


fetch("data/Batas_Padukuhan.geojson")
.then(r=>r.json())
.then(data=>{

    const batas = L.geoJSON(data);

    map.fitBounds(
        batas.getBounds(),
        {
            padding:[30,30]
        }
    );

});
