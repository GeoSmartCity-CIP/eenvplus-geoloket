/*globals cs, $ */
//TODO: BBOX instead of all

cs.addEventData = function(data){
    var records = new ol.Collection(data);

    records.forEach(function( record ){
         var y = record.location.lat;
         var x = record.location.lon;
         var coordinates = ol.proj.transform([x,y], 'EPSG:4326', 'EPSG:31370'); //to mercator
         record.geometry = new ol.geom.Point(coordinates);

         var feat = new ol.Feature(record);
         cs.eventLayer.getSource().addFeature(feat);
    });
}

cs.replaceEventData = function(data) {
    cs.eventLayer.getSource().clear(true);
    cs.addEventData(data);
}

cs.addEventLayer = function(){
    cs.eventLayer = new ol.layer.Vector({
       source: new ol.source.Vector({}),
       style: cs.styleCache['warning'],
       zIndex: 98
    });

    cs.map.on('click', function(evt) {
        if(  cs.activeTool !== "event" ) { return; }

        var clickedObj = cs.map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            return {feature: feature, layer: layer}
        });


        if ( clickedObj && clickedObj.layer === cs.eventLayer){
            var feature = clickedObj.feature;
            var title = "";
            var content = "";
            if(feature.get('description')) {
                  title = feature.get('description');
               }
            if(feature.get('datetime')) {
                  content += "<p> Tijd: <em>"+ feature.get('datetime') + "</em>";
               }
            if(feature.get('priority')) {
                  content += " - Prioriteit: <em>"+ feature.get('priority') + "</em>";
               }
            if(feature.get('status')) {
                  content += " - Status: <em>"+ feature.get('status') + "</em></p>";
               }
            var media =  feature.get('media');
            if (media && media.length > 0) {
                  content +=  '<img src="'+ media[0] +'" alt="'+ media[0] +'" onerror="imgError(this);" style="max-height: 350px;"></img>';
            }
            cs.openModal( title , content, false, true );
        }
    });
    cs.addPopover( cs.eventLayer,'description' );

    //to prevent a conflict with layermanager, delay adding to map
    setTimeout(function(){
        cs.map.addLayer( cs.eventLayer );
    }, 1000);
}

cs.addPopover = function( targetLyr, targetAttr ){
      var node = document.createElement('div');
      node.setAttribute("style", "background-color: lightyellow; margin: 5px;");
      var popup = new ol.Overlay({ element: node , offset: [10,0]});
      cs.map.addOverlay(popup);

      var displayFeatureInfo = function(pixel) {
          var feature = cs.map.forEachFeatureAtPixel(pixel, function(feature, layer) {
              if( layer === targetLyr ) return feature;
          });
          if (feature) {
               var extent = feature.getGeometry().getExtent();
               var x = extent[0] + (extent[2] - extent[0]) / 2;
               var y = extent[1] + (extent[3] - extent[1]) / 2;
               node.innerHTML = "<p>"+ feature.get(targetAttr) +"</p>";
               popup.setPosition([x,y]);
          }
          else {
              node.innerHTML = '';
              popup.setPosition(undefined);
          }
     };
     $( cs.map.getViewport()).on('mousemove', function(evt) {
          var pixel = cs.map.getEventPixel(evt.originalEvent);
          displayFeatureInfo(pixel );
     });
}
