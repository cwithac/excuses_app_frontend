// console.log('Excuses app is connected.');

var app = angular.module('excuses-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope){

  this.title = "Excuses, Excuses!"

  $scope.userIsLoggedIn = function() {
    if(localStorage.getItem('token')) {
      console.log('The user is logged in.');
      return true;
    } else {
      console.log('The user is NOT logged in.');
      return false;
    }
  };

  $scope.test = function() {
    console.log('THIS WORKS!');
  };

}]); // mainController END
