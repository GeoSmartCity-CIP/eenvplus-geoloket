/*globals angular, gsc */

//module global namespace
var tracerApp = angular.module('tracerApp', ['ngDialog']);
var tracer = {};

// main controller for tracer
tracerApp.controller('tracerController', ['$scope', '$http',
function($scope, $http) {
    var envplus_rest_Url = "";
    var nodeLyr = "";
    var tracerBaseUrl = "";

    //load config
    $http.get('config.json').then(
      function( response ){
            gsc.cs.csUrl( response.data.csurl );
            tracerBaseUrl = response.data.tracerUrl;
            envplus_rest_Url = response.data.envplus_rest_Url;
            nodeLyr = response.data.riolinkNodeLayer;
          },
          function (err) {
             throw err;
      });

    tracer.getNodeAtXY = function (x,y, callback ) {
      var geometry = x +","+ y;
      var mapSize = [ $scope.map.getSize()[0], $scope.map.getSize()[1], 96]
      var bbox = $scope.map.getView().calculateExtent($scope.map.getSize());

      var data = {"geometryFormat": "geojson", "geometryType":"esriGeometryPoint",
                  "layers": nodeLyr, "geometry": geometry, "imageDisplay": mapSize.join(","),
                  "tolerance": "5", "mapExtent": bbox.join(",") };

      var restUri = envplus_rest_Url + "?" + $.param(data);

        $.ajax(restUri)
          .done(function( data ) {
            if( typeof(data.results) === "undefined" ){
                callback( [] );
            }
            var results = $.map( data.results, function( val, i ) {
                return {id: val.id , xy: val.geometry.coordinates }
            });
            callback( results );
          });

    }

    tracer.getTrace = function( nodeID, streamDirection, callback ){
        var tracerUri = tracerUrl +"/"+ streamDirection +"/"+ nodeID;

        $.ajax(tracerUri)
          .done(function( data ) {
              callback( data );
          });
    }

}]);
