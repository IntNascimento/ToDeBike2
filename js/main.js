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

  window.initRoutes();
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
      var accident = data[i];

      var info = '<p>';
      info += "Tipo: " + accident.type;
      info += '</p>';
      info += '<p>Veículo envolvido:' + accident.vehicles[0] + '</p>';
      info += '<p>Enderço:' + accident.address + '</p>';
      if (!accident.fatal)
   	info += '<p>Feridos: ' + accident.injuried + '</p>';
      if (accident.vehicles[0] == "ONIBUS_URB" || accident.vehicles[0] == "ONIBUS_MET")
        info += '<IMG BORDER="0" ALIGN="Left" SRC="images/acidentes/onibus.jpg">';
      else
        info += '<IMG BORDER="0" ALIGN="Left" SRC="images/acidentes/carro.jpg">';

      ToDeBike.addMarker(
        accident.latitude,
        accident.longitude,
        "Acidente",
        ToDeBike.getMarkerIconFor(accident),
        info
      );
    }

    ToDeBike.centerMap();
  });
};

// Asynchronous loading of BikePOA stations
ToDeBike.loadBikePOAStations = function([0.009999999776482582,[[["https://mts0.googleapis.com/vt?lyrs=m@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.googleapis.com/vt?lyrs=m@280000000\u0026src=api\u0026hl=pt-BR\u0026"],null,null,null,null,"m@280000000",["https://mts0.google.com/vt?lyrs=m@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.google.com/vt?lyrs=m@280000000\u0026src=api\u0026hl=pt-BR\u0026"]],[["https://khms0.googleapis.com/kh?v=162\u0026hl=pt-BR\u0026","https://khms1.googleapis.com/kh?v=162\u0026hl=pt-BR\u0026"],null,null,null,1,"162",["https://khms0.google.com/kh?v=162\u0026hl=pt-BR\u0026","https://khms1.google.com/kh?v=162\u0026hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/vt?lyrs=h@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.googleapis.com/vt?lyrs=h@280000000\u0026src=api\u0026hl=pt-BR\u0026"],null,null,null,null,"h@280000000",["https://mts0.google.com/vt?lyrs=h@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.google.com/vt?lyrs=h@280000000\u0026src=api\u0026hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/vt?lyrs=t@132,r@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.googleapis.com/vt?lyrs=t@132,r@280000000\u0026src=api\u0026hl=pt-BR\u0026"],null,null,null,null,"t@132,r@280000000",["https://mts0.google.com/vt?lyrs=t@132,r@280000000\u0026src=api\u0026hl=pt-BR\u0026","https://mts1.google.com/vt?lyrs=t@132,r@280000000\u0026src=api\u0026hl=pt-BR\u0026"]],null,null,[["https://cbks0.googleapis.com/cbk?","https://cbks1.googleapis.com/cbk?"]],[["https://khms0.googleapis.com/kh?v=84\u0026hl=pt-BR\u0026","https://khms1.googleapis.com/kh?v=84\u0026hl=pt-BR\u0026"],null,null,null,null,"84",["https://khms0.google.com/kh?v=84\u0026hl=pt-BR\u0026","https://khms1.google.com/kh?v=84\u0026hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt/ft?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/vt?hl=pt-BR\u0026","https://mts1.googleapis.com/vt?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt/loom?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt/ft?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt/ft?hl=pt-BR\u0026"]],[["https://mts0.googleapis.com/mapslt/loom?hl=pt-BR\u0026","https://mts1.googleapis.com/mapslt/loom?hl=pt-BR\u0026"]]],["pt-BR","US",null,0,null,null,"https://maps.gstatic.com/mapfiles/","https://csi.gstatic.com","https://maps.googleapis.com","https://maps.googleapis.com",null,"https://maps.google.com"],["https://maps.gstatic.com/maps-api-v3/api/js/18/15a/intl/pt_br","3.18.15a"],[2204465565],1,null,null,null,null,null,"",null,null,1,"https://khms.googleapis.com/mz?v=162\u0026",null,"https://earthbuilder.googleapis.com","https://earthbuilder.googleapis.com",null,"https://mts.googleapis.com/vt/icon",[["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],["https://mts0.googleapis.com/vt","https://mts1.googleapis.com/vt"],null,null,null,null,null,null,null,null,null,null,["https://mts0.google.com/vt","https://mts1.google.com/vt"],"/maps/vt",280000000,132],2,500,["https://geo0.ggpht.com/cbk","https://g0.gstatic.com/landmark/tour","https://g0.gstatic.com/landmark/config","","https://www.google.com/maps/preview/log204","","https://static.panoramio.com.storage.googleapis.com/photos/",["https://geo0.ggpht.com/cbk","https://geo1.ggpht.com/cbk","https://geo2.ggpht.com/cbk","https://geo3.ggpht.com/cbk"]],["https://www.google.com/maps/api/js/master?pb=!1m2!1u18!2s15a!2spt-BR!3sUS!4s18/15a/intl/pt_br","https://www.google.com/maps/api/js/widget?pb=!1m2!1u18!2s15a!2spt-BR"],1,0], loadScriptTime);

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
