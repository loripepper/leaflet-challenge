var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var platesUrl = ""

d3.json(queryUrl).then (function(data) {
    console.log(data.features);


var streetmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
  id: 'mapbox/streets-v11',
	accessToken: API_KEY
});

var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
  id: 'mapbox/dark-v10',
	accessToken: API_KEY
});

var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

var myMap = L.map("mapid", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
  });

var earthquakes = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)
    },    
    style: function (feature) {
      return {
        fillColor: getColor(feature.properties.mag),
        color: "clear",
        opacity:1,
        fillOpacity:0.5,
        radius: feature.properties.mag * 6
      }
    }
  }).addTo(myMap);

  function getColor(magnitude) {
    if (magnitude > 5) {
      return "red";
    }
    if (magnitude > 4) {
      return "orange";
    }
    if (magnitude > 3) {
      return "yellow";
    }
    if (magnitude > 2) {
      return "lightgreen";
    }
    if (magnitude > 1) {
      return "grey";
    }
    return "lavender";
  };
  

var overlayMaps = {
  "Earthquakes": earthquakes
};


L.control.layers(baseMaps, overlayMaps, {collapsed: true})
.addTo(myMap);

}); 
