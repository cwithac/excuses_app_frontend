// console.log('Excuses app is connected.');

var app = angular.module('excuses-app', []);

app.filter('sorter', function() {
  return function(items, criteria, identifier) {
    if (identifier === 'user') {
      console.log('user!');
      console.log(criteria);
      userItems = [];
      for (var i = 0; i < items.length; i++) {
        if (criteria === items[i].excuse.user_id) {
          userItems.push(items[i]);
        }
      }
      return userItems;
    } else if (identifier === 'occasion'){
      console.log('occasion!');
      occasionItems = [];
      for (var i = 0; i < items.length; i++) {
        if (criteria === items[i].occasion.title) {
          occasionItems.push(items[i]);
        }
      }
      return occasionItems;
    } else {
      return items;
    }
  };
});

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "The Perfect Excuse"

  // this is the url for our backend, inject scope to your controllers and
  // you should be able to use this variable anywhere
  $scope.baseUrl = 'https://perfect-excuse.herokuapp.com/'

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  // scope variable holding occasions
  $scope.occasions = [];

  // declaring scope vars needed to toggle criteria for filter
  $scope.criteria;
  $scope.identifier;

  $scope.toggleSorter = function(criteria, identifier) {
    $scope.criteria = criteria;
    $scope.identifier = identifier;
  };

  // this is a function that checks if a user is logged in, inject scope to your
  // controllers and you should be able to use this variable anywhere
  $scope.userIsLoggedIn = function() {
    var jwt = localStorage.getItem('token');
    if(jwt !== 'undefined' && jwt !== undefined && jwt !== null) {
      console.log('The user is logged in.');
      $scope.userData.username = JSON.parse(localStorage.getItem('username'));
      $scope.userData.id = JSON.parse(localStorage.getItem('user_id'));
      return true;
    } else {
      $scope.userData = {};
      console.log('The user is NOT logged in.');
      return false;
    }
  };

}]); // mainController END
