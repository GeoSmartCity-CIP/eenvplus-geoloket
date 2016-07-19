/*globals cs, gsc, cs */

cs.controller('eventController', ['$scope', function($scope) {

    $scope.events = [];
    $scope.pageSize = 5;
    $scope.page = 0;
    
    $scope.gscWarning = false;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.events.length/$scope.pageSize);
    }

    $scope.zoomTo = function(loc){
        cs.zoomTo( loc.lon, loc.lat, 12 )
    }

    $scope.maximizeImage= function(name, url){
        var content = '<img src="'+url+'" alt="'+name+'" class="img-responsive">';
        cs.openModal( name, content, false, true );
    }

    cs.updateEventData = function () {
         gsc.cs.eventListFilter({}).done(function(events) {
             $scope.$apply(function(){
                 $scope.events = events;
                 cs.replaceEventData(events);
                 $scope.gscWarning = false;
             });
        }).fail(function (err) {
             $scope.gscWarning = err.statusText ;
        });
    }
    cs.updateEventData();
}]);

cs.directive('events', function() { 
  return { 
    restrict: 'E', 
    templateUrl: 'cs/directives/events.html' 
  }
});


