angular.module('excuses-app').directive('loginForm', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/login-form.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
