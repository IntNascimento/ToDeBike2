// Initialize our main "module" for attaching JS code
window.ToDeBike = window.ToDeBike || {};

// DOM element that the map will be rendered
ToDeBike.mapCanvasId = 'map-canvas';

var map;
var markers = [];

// Kick off google maps rendering
ToDeBike.initGoogleMap = function() {
  var mapOptions = {
    center: { lat: -30.0377, lng: -51.1637 },
    zoom: 14
  };
  ToDeBike.map = new google.maps.Map(document.getElementById(ToDeBike.mapCanvasId), mapOptions);
}
google.maps.event.addDomListener(window, 'load', ToDeBike.initGoogleMap);


// Add a single marker to the Array markers using the provided coordinates
ToDeBike.addMarker = function(lat, lng, title, icon) {
	var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat, lng),
    icon: icon,
    map: ToDeBike.map,
    title: title
  });
  markers.push(marker);
}

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
    ToDeBike.centerMap();
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
        "../images/icones/bike.png"
      );
    }
    ToDeBike.centerMap();
  });
};

// Centers map based on known markers
ToDeBike.centerMap = function() {
  var latlngbounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    marker = markers[i];
    latlngbounds.extend(marker.getPosition());
  }
  ToDeBike.map.setCenter(latlngbounds.getCenter());
  ToDeBike.map.fitBounds(latlngbounds);
}

// Sets the map on all markers in the array.
ToDeBike.setAllMap = function(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
ToDeBike.clearMarkers = function() {
  ToDeBike.setAllMap(null);
}

// Deletes all markers in the array by removing references to them.
ToDeBike.deleteMarkers = function() {
  ToDeBike.clearMarkers();
  markers = [];
}

// Ciclovias
ToDeBike.setCiclovias = function(map) {
 var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);
}
