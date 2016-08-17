tracerApp.controller('tracerFormController', ['$scope', 'ngDialog',
  function($scope, ngDialog) {

      var reset = function () {
        $scope.rio_x = 0;
        $scope.rio_y = 0;
        $scope.rio_node = null;
        $scope.rio_nodeMsg = "Kies een punt op de Kaart";
      }
      reset();  //call once to set on load

      $scope.tracecommit = function () {
          tracer.getTrace( $scope.rio_node, $scope.direction, function(geom){
              tracerlayer.addTraceline(geom);
          });
          $scope.rio_node = null;
      };

      $scope.traceclear = function () {
          reset();
          tracerlayer.clear();
      };

      $scope.chooseNode = function(){
           $("body").css( "cursor", "crosshair");

           $scope.map.once('click', function(evt) {
               $("body").css( "cursor", "default");
               $scope.rio_x = Math.round( evt.coordinate[0]);
               $scope.rio_y = Math.round( evt.coordinate[1]);
               $scope.$apply();
               tracer.getNodeAtXY(evt.coordinate[0], evt.coordinate[1], traceCallback);
           });
       }

      // callback of mapEvent that gets KoppelPunt at xy
      var traceCallback= function(data){
         if( data.length > 0 ){
            $scope.rio_node = data[0].id;
            var xy = data[0].xy;
            $scope.rio_nodeMsg = "punt met id " + data[0].id
            tracerlayer.newTraceStart( xy );
         }
         else {
            $scope.rio_node = null;
            $scope.rio_nodeMsg = "Geen KoppelPunt in de buurt van geklikt punt";
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
      templateUrl: 'tracer/directives/tracerForm.html',
      link: function (scope) {
          tracerlayer.init(scope.map);
      }
    };
});
