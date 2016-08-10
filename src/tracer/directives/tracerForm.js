tracer.controller('tracerFormController', ['$scope', 'ngDialog',
  function($scope, ngDialog) {


  }]);


tracer.directive('tracerform', function() {
    return {
      restrict: 'E',
      scope: {
              map: '=tracermap'
            },
      templateUrl: 'tracer/directives/tracerForm.html' ,
      link: function (scope) {

          }
    };
});
