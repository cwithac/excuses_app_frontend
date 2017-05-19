angular.module('excuses-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {
  // this function will make a login request when called
  this.login = function(loginData) {
    console.log(loginData);
    // http request
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users/login',
      data: {
        user: {
          username: loginData.username,
          password: loginData.password
        }
      }
    }).then(
      function(response) {
        console.log(response.data);
        // saves webtoken to local storage
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }.bind(this),
      function(error) {
        console.log(error);
      });
  };

  // this function will make a sign up request when called
  this.signUp = function(signUpData) {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users',
      data: {
        user: {
          username: signUpData.username,
          password: signUpData.password
        }
      }
    }).then(
      function(response) {
        console.log(response.data)
      }.bind(this),
      function(error) {
        console.log(error);
      });
  };

  // this function will delete the webtoken from local storage
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  };

}]);
