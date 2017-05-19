angular.module('excuses-app').directive('signUpForm', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/sign-up-form.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
