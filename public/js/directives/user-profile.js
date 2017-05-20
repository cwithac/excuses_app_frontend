angular.module('excuses-app').directive('userProfile', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/user-profile.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
