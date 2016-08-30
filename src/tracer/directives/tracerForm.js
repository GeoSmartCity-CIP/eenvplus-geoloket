tracerApp.controller('tracerFormController', ['$scope', 'ngDialog',
  function($scope, ngDialog) {
      $scope.direction = "upstream";
      var reset = function () {
        $scope.rio_node = null;
        $scope.rio_nodeFound = false;
        $scope.tracingActive = false;
        $scope.rio_nodeMsg = "Choose a point on the map";
      }
      reset();  //call once to set on load

      $scope.tracecommit = function () {
          tracer.getTrace( $scope.rio_node, $scope.direction, function(geom){
              tracerlayer.addTraceline(geom);
          });
          reset();
      };

      $scope.traceclear = function () {
          reset();
          tracerlayer.clear();
      };

      $scope.chooseNode = function(){
           $("body").css( "cursor", "crosshair");
           $scope.tracingActive = true;

           $scope.map.once('click', function(evt) {
               $("body").css( "cursor", "default");
               $scope.tracingActive = false;

               $scope.$apply();
               tracer.getNodeAtXY(evt.coordinate[0], evt.coordinate[1], traceCallback);
           });
       }

      // callback of mapEvent that gets KoppelPunt at xy
      var traceCallback= function(data){
         if( data.length > 0 ){
            $scope.rio_node = data[0].id;
            $scope.rio_nodeFound = true;
            var xy = data[0].xy;
            $scope.rio_nodeMsg = "Point with id " + $scope.rio_node
            tracerlayer.newTraceStart( xy );
         }
         else {
            $scope.rio_node = null;
            $scope.rio_nodeFound = false;
            $scope.rio_nodeMsg = "No Appurtenance in the neighborhood of the clicked point";
         }
         $scope.$apply();
      }

  }]);

tracerApp.directive('tracerform', function() {
    return {
      restrict: 'E',
      scope: {
              map: '=tracermap'
            },
      templateUrl: 'tracer/directives/tracerform.html',
      link: function (scope) {
          tracerlayer.init(scope.map);
      }
    };
});
