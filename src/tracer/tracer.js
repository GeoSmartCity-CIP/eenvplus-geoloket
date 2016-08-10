/*globals angular, gsc */

//module global namespace
var tracer = angular.module('tracerApp', ['tink.tinkApi', 'tink.accordion', 'ngDialog']);

// main controller for tracer
cs.controller('tracerController', ['$scope', '$http',
    function($scope, $http) {
      var wfs_appurtenance = "http://geoserver.vmm.be/geoserver/eENVplus/ows";
      var tracerUrl = '';
      //load config
      $http.get('config.json').then(
          function( response ){
            gsc.cs.csUrl( response.data.csurl );

            tracerUrl = response.data.tracerUrl;
            wfs_appurtenance = response.data.wfs_appurtenance;
            console.log(wfs_appurtenance)
          },
          function (err) {
             throw err;
        });

   tracer.getAppurtenanceAtXY = function (x,y, offset, count) {
      var bbox =[x - offset, y - offset, x + offset, y + offset].join(",");
      //
      // var data = {"service": "WFS" , "version": "2.0.0",
      //     "request": "GetFeature", "typeName": "eENVplus:v_appurtenance",
      //     "count": count, "outputFormat": "json", "srsName": "EPSG:31370",
      //     "bbox": bbox  };

      var data = {"service": "WFS" , "version": "2.0.0", "request": "GetFeature",
                "typeName": "lu:lu_la_pr", "outputFormat": "json", "srsName": "EPSG:31370",
                "count": count, "bbox": bbox  };

      var wfsUri = wfs_appurtenance +"?"+ $.param(data);
      console.log( wfsUri )

      $http.get( wfsUri ).then(
          function( response ){
              console.log(response.data);
          },
          function (err) {
             throw err;
        });
    };




}]);
