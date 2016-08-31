/*globals cs, $ */

cs.controller('crowdsourceController', ['$scope', 'ngDialog', function($scope, ngDialog) {

      var evt = {};
      $scope.creatingEvent = false;
      $scope.gettingPosition = false;

      $scope.forMyPosition = function() {
          $scope.gettingPosition = true;
          if( evt.listener ) {
                cs.map.un('click' , evt.listener );
          }
          cs.getMyPosition( eventForm,  function (err) {
            $scope.gettingPosition = false;
            $scope.$apply();
            alert(err);
          });

        };

      $scope.positionFromMap = function () {
           $scope.gettingPosition = true;
           evt = cs.positionFromMap( eventForm );
        };

      $scope.cancel = function () {
           if( evt.listener ) {
                cs.map.un('click' , evt.listener );
           }
           $('body').css("cursor",'default')
           $scope.creatingEvent = false;
           $scope.gettingPosition = false;
        };

      var eventForm = function(x,y, cancel) {
           $scope.gettingPosition = false;
           $scope.xy =  [x,y];

           ngDialog.open({
                   template: 'cs/directives/createEvent.html',
                   className: 'ngdialog-theme-default',
                   controller:  'createEventCtrl',
                   closeByEscape: false,
                   closeByDocument : false,
                   scope: $scope,
                   preCloseCallback: function (value) {
                      $scope.creatingEvent = value;
                      $scope.gettingPosition = false;
                   }
               });
      };

      cs.newEvent = function(){
          $scope.creatingEvent  = true;
      }
}]);

cs.directive('crowdsource', function() {
  return {
    restrict: 'E',
    scope: {
            map: '=csmap'
          },
    templateUrl: 'cs/directives/crowdsource.html' ,
    link: function (scope) {
      cs.init( scope.map );
    }
  };
});
