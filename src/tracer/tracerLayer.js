var tracerlayer = {};

tracerlayer.init = function (map) {
    tracerlayer.Layer = new ol.layer.Vector({
        source: new ol.source.Vector({}),
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({color: 'rgba(0, 255, 0, 0.5)'}),
                stroke: new ol.style.Stroke({color: 'rgba(0, 255, 0, 0.8)', width: 1})
            }),
            stroke: new ol.style.Stroke({color: 'rgba(0,255,0, 0.6)', width: 6})
        }),
        zIndex: 99
    });
    map.addLayer(tracerlayer.Layer);
};

tracerlayer.clear = function () {
    tracerlayer.Layer.getSource().clear(true);
};

tracerlayer.newTraceStart = function (startpoint) {
    tracerlayer.clear();
    var feat = new ol.Feature({geometry: new ol.geom.Point(startpoint)});
    tracerlayer.Layer.getSource().addFeature(feat);
};

tracerlayer.addTraceline = function (gjs) {
    var features = $.map(gjs.features, function (val, i) {
        var geom = new ol.geom.LineString(val.geometry.coordinates);
        return new ol.Feature({geometry: geom});
    });
    tracerlayer.Layer.getSource().addFeatures(features);
};
