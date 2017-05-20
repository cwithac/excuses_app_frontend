angular.module('excuses-app').directive('editProfileForm', function() {
  return {
    restrict: 'E',
    templateUrl: '../../partials/edit-profile-form.html',
    controller: 'loginController',
    controllerAs: 'loginCtrl'
  };
});
