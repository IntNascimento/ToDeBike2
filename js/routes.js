function initRoutes() {
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

      ToDeBike.deleteMarkers();
      ToDeBike.loadAccidents("data/accidents.json");
      $("#titulo-filtro").load("filtros-acidentes-todos.html");
    },

    '/acidentes/:type': function(type) {
      $('#conteudo').hide();
      $('#googlemaps').show();

      ToDeBike.deleteMarkers();
      ToDeBike.loadAccidents("data/accidents-" + type + ".json");
      $("#titulo-filtro").load("filtros-acidentes-" + type + ".html");
    },

    '/estacoes': function(type) {
      $('#conteudo').hide();
      $('#googlemaps').show();

      ToDeBike.deleteMarkers();
      ToDeBike.loadBikePOAStations('data/bikepoa.json');
      $("#titulo-filtro").load("filtros-estacoes-bike.html");
    },

    '/dicas/:page': function(page) {
      $('#googlemaps').hide();
      $("#conteudo").load(page + ".html", function() {
        $('#conteudo').show();
      });
    },

    '/ondeir': function(page) {
      $('#googlemaps').hide();
      $("#conteudo").load("ondeir.html", function() {
        $('#conteudo').show();
      });
    },
    
     '/tweets': function(page) {
      $('#googlemaps').hide();
      $("#conteudo").load("tweets.html", function() {
        $('#conteudo').show();
      });
    }
  });
};
