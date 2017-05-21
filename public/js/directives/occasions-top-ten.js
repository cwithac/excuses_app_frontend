angular.module('excuses-app').directive('occasionsTopTen', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/occasions-top-ten.html',
    controller: 'occasionController',
    controllerAs: 'occasionCtrl'
  };
});
