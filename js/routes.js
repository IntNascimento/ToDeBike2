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
    }, 300);
  },

  '/acidentes/:type': function(type) {
    $('#conteudo').hide();
    $('#googlemaps').show();

    setTimeout(function() {
      ToDeBike.deleteMarkers();
      ToDeBike.loadAccidents("data/accidents-" + type + ".json");
      $("#titulo-filtro").load("filtros-acidentes-" + type + ".html");
    }, 300);
  },

  '/estacoes': function(type) {
    $('#conteudo').hide();
    $('#googlemaps').show();

    setTimeout(function() {
      ToDeBike.deleteMarkers();
      ToDeBike.loadBikePOAStations('data/bikepoa.json');
      $("#titulo-filtro").load("filtros-estacoes-bike.html");
    }, 300);
  },

  '/dicas/:page': function(page) {
    setTimeout(function() {
      $('#googlemaps').hide();
      $("#conteudo").load(page + ".html", function() {
        $('#conteudo').show();
      });
    }, 300);
  },

  '/ondeir': function(page) {
    setTimeout(function() {
      $('#googlemaps').hide();
      $("#conteudo").load("ondeir.html", function() {
        $('#conteudo').show();
      });
    }, 300);
  }
});
