// console.log('Excuses app is connected.');

var app = angular.module('excuses-app', []);

app.filter('sorter', function() {
  return function(items, criteria, identifier) {
    // this will make sure that the excuse that was added last will appear first
    // wanted to use the reverse method but that would throw a rootscope error
    // so I am looping instead ...
    newestFirst = [];
    for (var i = 0; i < items.length; i++) {
      newestFirst.unshift(items[i]);
    }

    if (identifier === 'user') {
      userItems = [];
      for (var i = 0; i < items.length; i++) {
        if (criteria === items[i].excuse.user_id) {
          userItems.unshift(items[i]);
        }
      }
      return userItems;
    } else if (identifier === 'occasion'){
      occasionItems = [];
      for (var i = 0; i < items.length; i++) {
        if (criteria === items[i].occasion.title) {
          occasionItems.unshift(items[i]);
        }
      }
      return occasionItems;
    } else if (criteria === 'all') {
      return newestFirst;
    } else {
      return newestFirst;
    }
  };
});

app.controller('mainController', ['$http', '$scope', function($http, $scope){
  this.title = "The Perfect Excuse"

  // this is the url for our backend, inject scope to your controllers and
  // you should be able to use this variable anywhere
  $scope.baseUrl = /*'https://perfect-excuse.herokuapp.com/'*/ 'http://localhost:3000/'

  // scope variable holding userData, available to all controllers
  $scope.userData = {};

  // scope variable holding occasions
  $scope.occasions = [];

  // scope variable holding relations
  $scope.excuses = [];

  $scope.showButtons = function() {
    var currentUser = $scope.userData.id;
    var excuseList = $scope.excuses;
    console.log(excuseList);
      for (var i = 0; i < excuseList.length; i++) {
        if (currentUser === excuseList[i].excuse.user_id) {
          excuseList[i].excuse.editButton = true;
          excuseList[i].excuse.deleteButton = true;
      } else {
          console.log('else statement');
          excuseList[i].excuse.editButton = false;
          excuseList[i].excuse.deleteButton = false;
      }
    };
  };

  // declaring scope vars needed to toggle criteria for filter
  $scope.criteria;
  $scope.identifier;

  $scope.toggleSorter = function(criteria, identifier) {
    $scope.criteria = criteria;
    $scope.identifier = identifier;
  };

  // currentUser
  $scope.loggedInUser = false;

  // this is a function that checks if a user is logged in, inject scope to your
  // controllers and you should be able to use this variable anywhere
  $scope.userIsLoggedIn = function() {
    var jwt = localStorage.getItem('token');
    if(jwt !== 'undefined' && jwt !== undefined && jwt !== null) {
      console.log('The user is logged in.');
      $scope.userData.username = JSON.parse(localStorage.getItem('username'));
      $scope.userData.id = JSON.parse(localStorage.getItem('user_id'));
      $scope.loggedInUser = true;
    } else {
      $scope.userData = {};
      console.log('The user is NOT logged in.');
      $scope.loggedInUser = false;
    }
  };

  $scope.userIsLoggedIn();

}]); // mainController END
