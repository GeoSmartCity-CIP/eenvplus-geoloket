/*globals angular, gsc */

//module global namespace
var cs = angular.module('csApp', ['tink.tinkApi', 'tink.accordion', 'ngDialog']);

// main controller for crowdsource
cs.controller('csController', ['$scope', '$http', 'ngDialog', '$sce',
    function($scope, $http, ngDialog, $sce) {
      $scope.activeTool = cs.activeTool = "event";

      //load config
      $http.get('config.json').then(
          function( response ){
            gsc.cs.csUrl( response.data.csurl );
          },
          function (err) {
             throw  err;
        });

    //modal
    cs.openModal = function(title, content, showOK, showCancel) {
      $scope.title = title;
      $scope.content = $sce.trustAsHtml(content);
      $scope.showOK = showOK;
      $scope.showCancel = showCancel;

      ngDialog.open({
              template: 'cs/directives/modal.html',
              className: 'ngdialog-theme-default',
              scope: $scope
          });
   }

}]);

////global helper functions////

//hide images with broken urls
function imgError(image){
    image.style.display = 'none';
}
//get a timestamp in iso-notation
function getTimeStamp() {
        var now = new Date();
        return (now.getFullYear() + "-" +
        (now.getMonth() + 1) + '-' +
        (now.getDate()) + 'T' +
        now.getHours() + ':' +
        ((now.getMinutes() < 10)
                ? ("0" + now.getMinutes())
                : (now.getMinutes())) + ':' +
        ((now.getSeconds() < 10)
                ? ("0" + now.getSeconds())
                : (now.getSeconds())));
    }
