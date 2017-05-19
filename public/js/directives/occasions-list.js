angular.module('excuses-app').directive('occasionsList', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/occasions-list.html',
    controller: 'occasionController',
    controllerAs: 'occasionCtrl'
  };
});
