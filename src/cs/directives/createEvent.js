/*globals cs, gsc */
cs.controller('createEventCtrl', ['$scope', function($scope) {

      $scope.title = "Creëer een nieuwe melding";
      $scope.description = "";
      $scope.priority = "low"
      $scope.priorities = ["normal","low","high"];

      $scope.ok = function() {
         createEvent( $scope.xy[0], $scope.xy[1], $scope.description, $scope.priority );
         $scope.closeThisDialog(false);
      }

      $scope.cancel = function() {
         $scope.closeThisDialog(true);
      }

      var createEvent = function(x,y, description, priority ) {
            var data ={
                "description": description,
                "media": [{"type": "image/png", "uri": "part://1"}],
                "location": {
                    "lon": x, "lat": y,
                    "crs": "epsg:4326"
                },
                "priority": priority,
                "datetime": getTimeStamp(),
                "status": "submitted"
            };
            var request = new FormData();
            request.append('event', JSON.stringify(data));
            request.append('part://1', $('#fileInput')[0].files[0]);

            gsc.cs.eventCreate(request)
                    .done(function(data){
                       cs.updateEventData();
                  }).fail(function(err){
                       cs.showModal("Error", err, true);
            });
        }

}]);
