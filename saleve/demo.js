// This demo is based off of cibi.me by OpenPlans and my earlier visualization
// at http://github.com/openplans/cibi_animation

(function(){
  var bikeIcon = L.icon({
      iconUrl: 'http://image.noelshack.com/fichiers/2013/19/1368268918-pierre.png',
      iconSize: [40, 49],
      iconAnchor: [20, 25],
      shadowUrl: null
  });

  var config = {
      tileUrl : 'http://{s}.tiles.mapbox.com/v3/pierregeo.map-fevjoemr/{z}/{x}/{y}.png',
      //overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
      tileAttrib : 'Routing powered by <a href="http://opentripplanner.org/">OpenTripPlanner</a>, Map tiles &copy; Development Seed and OpenStreetMap ',
      initLatLng : new L.LatLng(46.19845429999999, 6.142476200000033), // Geneva
      initZoom : 13,
      minZoom : 13,
      maxZoom : 17
  };

  var map = L.map('map', {minZoom: config.minZoom, maxZoom: config.maxZoom}),
      routeLines = [
        L.polyline([[[6.1430740356446, 46.211585998536], [6.1420440673828, 46.200256347657], [6.1544036865235, 46.195106506348], [6.1592102050782, 46.188583374024], [6.1581802368164, 46.177597045899], [6.1471939086914, 46.170043945313], [6.1348342895508, 46.175880432129], [6.1389541625977, 46.191329956055], [6.1358642578125, 46.207122802735], [6.1293411254883, 46.207122802735]];

  map.addLayer(new L.TileLayer(config.tileUrl, {attribution: config.tileAttrib}));
  map.addLayer(new L.TileLayer(config.overlayTileUrl));
  map.setView(config.initLatLng, config.initZoom);


  $.each(routeLines, function(i, routeLine) {
    var marker = L.animatedMarker(routeLine.getLatLngs(), {
      icon: bikeIcon,
      autoStart: false,
      onEnd: function() {
        $(this._shadow).fadeOut();
        $(this._icon).fadeOut(3000, function(){
          map.removeLayer(this);
        });
      }
    });

    map.addLayer(marker);

    $(marker._icon).hide().fadeIn(1000, function(){
      marker.start();
    });
  });
})();
