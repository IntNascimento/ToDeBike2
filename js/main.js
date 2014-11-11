// Initialize our main "module" for attaching JS code
window.ToDeBike = window.ToDeBike || {};

// DOM element that the map will be rendered
ToDeBike.mapCanvasId = 'map-canvas';

// Kick off google maps rendering
ToDeBike.initGoogleMap = function() {
  var mapOptions = {
    center: { lat: -30.0377, lng: -51.1637 },
    zoom: 14
  };
  ToDeBike.map = new google.maps.Map(document.getElementById(ToDeBike.mapCanvasId), mapOptions);
}
google.maps.event.addDomListener(window, 'load', ToDeBike.initGoogleMap);

// Add a single marker to the map using the provided coordinates
ToDeBike.addMarker = function(lat, lng, title, icon) {
  new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    icon: icon,
    map: ToDeBike.map,
    title: title
  });
};

// Asynchronous loading of accidents involving bikes
ToDeBike.loadAccidents = function(accidentsJsonPath) {
  $.getJSON(accidentsJsonPath, function(data) {
    for (var i = 0; i < data.length; i++) {
      ToDeBike.addMarker(
        data[i].latitude,
        data[i].longitude,
        "Acidente",
        "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      );
    }
  });
};

// Asynchronous loading of BikePOA stations
ToDeBike.loadBikePOAStations = function(jsonBikePOAPath) {
  $.getJSON(jsonBikePOAPath, function(data) {
    for (var i = 0; i < data.length; i++) {
      ToDeBike.addMarker(
        data[i].latitude,
        data[i].longitude,
        "Estação '" + data[i].name + "'",
        "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
      );
    }
  });
};