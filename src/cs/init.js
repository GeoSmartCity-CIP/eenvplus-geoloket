/*globals ol, cs, navigator, $ */

cs.init = function( map ){
    cs.map = map;
    cs.addEventLayer();
};

cs.zoomTo = function(x, y, zoom){
    var view = cs.map.getView();

    var panAni = ol.animation.pan({
        source: view.getCenter()
    });
    var zoomAni = ol.animation.zoom({
        resolution: view.getResolution(),
        source: view.getZoom()
    });
    cs.map.beforeRender(panAni,zoomAni);

    if( typeof(zoom) === "number"){
        view.setZoom(zoom);
    }
    var center = ol.proj.transform( [x,y], 'EPSG:4326', 'EPSG:31370');
    view.setCenter( center );

};

cs.getMyPosition = function(callback){
    if (navigator.geolocation && typeof(callback) === "function" ) {
        navigator.geolocation.getCurrentPosition(
         function(pos){
             var y = pos.coords.latitude;
             var x = pos.coords.longitude;
             callback(x,y);
          },
         function(err){
           alert( "No gps position available: " + err.message );
           throw err;
         },   { enableHighAccuracy: true, timeout: 3000 }
        );
    }
    else {
      alert( "No gps position available" );
      throw "No gps position available";
    }
};

//get a single xy from mapclick
cs.positionFromMap = function(callback){
    var oldTool = cs.activeTool;
    cs.activeTool = "positionFromMap";
    $("body").css( "cursor", "crosshair");
    //return the event so it can be canceled
    return cs.map.once('click', function(evt) {
        var xy = ol.proj.transform(  evt.coordinate, 'EPSG:31370', 'EPSG:4326');
        cs.activeTool = oldTool;
        $("body").css( "cursor", "default")
        callback(xy[0], xy[1]);
    });
}

cs.styleCache = {
 'warning': new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: '#F00',
        opacity: 0.6
      }),
      stroke: new ol.style.Stroke({
        color: '#F00',
        width: 1
      })
    })
  }),

 'selected': new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: '#F00',
        opacity: 0.6
      }),
      stroke: new ol.style.Stroke({
        color: '#FF0',
        width: 2
      })
    })
  }),

 'circle20': new ol.style.Style({
    image: new ol.style.Circle({
      radius: 20,
      stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 2
      })
    })
  })
}
