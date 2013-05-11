// This demo is based off of cibi.me by OpenPlans and my earlier visualization
// at http://github.com/openplans/cibi_animation

(function(){
  var bikeIcon = L.icon({
      iconUrl: 'http://image.noelshack.com/fichiers/2013/19/1368268918-pierre.png',
      iconSize: [40, 49],
      iconAnchor: [20, 42],
      shadowUrl: null
  });

  var config = {
      tileUrl : 'http://{s}.tiles.mapbox.com/v3/pierregeo.map-fevjoemr/{z}/{x}/{y}.png',
      //overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
      tileAttrib : 'Routing powered by <a href="http://opentripplanner.org/">OpenTripPlanner</a>, Map tiles &copy; Development Seed and OpenStreetMap ',
      initLatLng : new L.LatLng(46.19845429999999, 6.142476200000033), // Geneva
      initZoom : 13,
      minZoom : 3,
      maxZoom : 17
  };

  var map = L.map('map', {minZoom: config.minZoom, maxZoom: config.maxZoom}),
            routeLines = [
        L.polyline([[46.20128006555538,6.140499114990343],[46.19783442453366,6.142215728759816],[46.19640857883767,6.146335601806716],[46.19628975669274,6.149940490722719],[46.1945073936906,6.15182876586925],[46.19343794814086,6.1538887023926545],[46.18892228193565,6.152343750000057],[46.18666430970383,6.157150268554728],[46.18488163452989,6.156806945800888],[46.18321775221022,6.158351898193396],[46.18155381953079,6.157665252685624],[46.18095954565553,6.161098480224663],[46.18250464437074,6.16418838500986],[46.18440624471981,6.165733337402458],[46.18321775221022,6.16830825805676],[46.17584852516805,6.161785125732524],[46.17418436946825,6.1698532104492685],[46.16847831046012,6.177749633789138],[46.16728947365494,6.185474395752042],[46.16633838571037,6.189594268798942],[46.16253386949123 ,6.191139221191451]]),
  //L.polyline([[6.1420440673827, 46.217765808106], [6.1379241943359, 46.193046569825], [6.177749633789, 46.199226379395], [6.1763763427734, 46.170387268067], [6.1303710937499, 46.169700622559], [6.0967254638671, 46.206779479981], [6.1214447021484, 46.217079162598]])
      ];
  map.addLayer(new L.TileLayer(config.tileUrl, {attribution: config.tileAttrib}));
  //map.addLayer(new L.TileLayer(config.overlayTileUrl));
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
