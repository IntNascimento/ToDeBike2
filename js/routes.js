routie({
  '/': function() {
    $('#conteudo').hide();
    $('#googlemaps').show();
    $("#titulo-filtro").html('');

    ToDeBike.deleteMarkers();
    ToDeBike.loadAccidents('data/accidents.json');
    ToDeBike.loadBikePOAStations('data/bikepoa.json');
  },

  '/acidentes': function() {
    $('#conteudo').hide();
    $('#googlemaps').show();

    setTimeout(function() {
      ToDeBike.deleteMarkers();
      ToDeBike.loadAccidents("data/accidents.json");
      $("#titulo-filtro").load("filtros-acidentes-todos.html");
    }, 100);
  },

  '/acidentes/:type': function(type) {
    $('#conteudo').hide();
    $('#googlemaps').show();

    setTimeout(function() {
      ToDeBike.deleteMarkers();
      ToDeBike.loadAccidents("data/accidents-" + type + ".json");
      $("#titulo-filtro").load("filtros-acidentes-" + type + ".html");
    }, 100);
  },
});
