angular.module('excuses-app').directive('excusesList', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/excuses-list.html',
    controller: 'excusesController',
    controllerAs: 'excuseCtrl'
  };
});
