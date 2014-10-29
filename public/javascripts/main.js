// Initialize our main "module" for attaching JS code
window.ToDeBike = window.ToDeBike || {};

// DOM element that the map will be rendered
ToDeBike.mapCanvasId = 'map-canvas';

// Kick off google maps rendering
ToDeBike.initGoogleMap = function() {
  var mapOptions = {
    center: { lat: -30.0277, lng: -51.1957},
    zoom: 14 /*,
    mapTypeId: google.maps.MapTypeId.SATELLITE*/
  };
  var map = new google.maps.Map(document.getElementById(ToDeBike.mapCanvasId), mapOptions);

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(-30.031851, -51.181636),
    map: map,
    title: "Acidente"
  });
}
google.maps.event.addDomListener(window, 'load', ToDeBike.initGoogleMap);

// Asynchronous loading of accidents involving bikes
ToDeBike.loadAccidents = function(accidentsPath) {
  console.log(accidentsPath);
};