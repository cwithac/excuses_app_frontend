angular.module('excuses-app').controller('loginController', ['$http',
function($http) {
  // initializes the variables
  // this.loginData = {
  //   username: '',
  //   password: ''
  // }

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
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }.bind(this),
      function(error) {
        console.log(error);
      });
  };

  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  };

}]);
