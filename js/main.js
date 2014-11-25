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

  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(ToDeBike.map);

  ToDeBike.infoWindow = new google.maps.InfoWindow({});
}
google.maps.event.addDomListener(window, 'load', ToDeBike.initGoogleMap);


// Add a single marker to the Array markers using the provided coordinates
ToDeBike.addMarker = function(lat, lng, title, icon, info) {
	var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat, lng),
    icon: icon,
    map: ToDeBike.map,
    title: title
  });
  markers.push(marker);

  if (info) {
    google.maps.event.addListener(marker, 'click', (function(marker,content){
        return function() {
          var contentString =
                '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>'+
                '<div id="bodyContent">'+
                content+
                '</div>'+
                '</div>';
            ToDeBike.infoWindow.setContent('<div>'+contentString+'</div>');
            ToDeBike.infoWindow.open(ToDeBike.map, marker);
        };
    })(marker, info));
  }
}

ToDeBike.getMarkerIconFor = function(accident) {
  if (accident.fatal)
    return "images/icons/acidente-fatal.png";
  else
    return "images/icons/acidente-nao-fatal.png";
};

// Asynchronous loading of accidents involving bikes
ToDeBike.loadAccidents = function(accidentsJsonPath) {
  $.getJSON(accidentsJsonPath, function(data) {
    for (var i = 0; i < data.length; i++) {
      var info = '<p>';
      info += "Tipo: " + data[i].type;
      info += '</p>';
     if (vehicles.match(/ONIBUS_.*/))
      	info += '<IMG BORDER="0" ALIGN="Left" SRC="images/AcidenteOnibusVitimaFatal.png">';
      else
      	info += '<IMG BORDER="0" ALIGN="Left" SRC="images/acidenteComCarro.jpg">';
      
      ToDeBike.addMarker(
        data[i].latitude,
        data[i].longitude,
        "Acidente",
        ToDeBike.getMarkerIconFor(data[i]),
        info
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
        "images/icons/bike.png"
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
