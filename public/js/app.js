// console.log('Excuses app is connected.');

var app = angular.module('excuses-app', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "The Perfect Excuse ..."

  // this is the url for our backend, inject scope to your controllers and
  // you should be able to use this variable anywhere
  $scope.baseUrl = 'https://perfect-excuse.herokuapp.com/'

  // this is a function that checks if a user is logged in, inject scope to your
  // controllers and you should be able to use this variable anywhere
  $scope.userIsLoggedIn = function() {
    var token = localStorage.getItem('token');
    if(token !== 'undefined' && token !== undefined && token !== null) {
      console.log('The user is logged in.');
      return true;
    } else {
      console.log('The user is NOT logged in.');
      return false;
    }
  };

}]); // mainController END
