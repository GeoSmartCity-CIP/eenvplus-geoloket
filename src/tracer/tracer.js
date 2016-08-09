/*globals angular, gsc */

//module global namespace
var tracer = angular.module('tracerApp', ['tink.tinkApi', 'tink.accordion', 'ngDialog']);

// main controller for crowdsource
cs.controller('csController', ['$scope', '$http',
    function($scope, $http) {
      $scope.activeTool = cs.activeTool = "event";

      //load config
      $http.get('config.json').then(
          function( response ){
            $scope.tracerUrl = response.data.tracerUrl;
            $scope.wfs_appurtenance = response.data.wfs_appurtenance;
          },
          function (err) {
             throw  err;
        });


}]);
