angular.module('excuses-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {
  // ******************************* jQuery ***********************************

  // --------------------- hiding / showing modals on click ---------------------

  // --- elements ---
  $signUpLink = $('#sign-up-link')
  $logInLink = $('#log-in-link');
  $signUpModal = $('#sign-up-modal')
  $logInModal = $('#login-modal');
  $modal = $('.modal');
  $closeBtn = $('.close-btn');
  $editProfileLink = $('#edit-profile-link');
  $editProfileModal = $('#edit-profile-modal');

  // --- actions ---
  // modals hidden by default
  $modal.hide();

  // function for opening sing up modal
  $openSignUpModal = function() {
    $modal.hide();
    $signUpModal.show();
  };

  // function for opening log in modal
  $openlogInModal = function() {
    $modal.hide();
    $logInModal.show();
  };

  // function for opening edit profile modal
  $openEditProfileModal = function() {
    console.log('calling');
    $modal.hide();
    $editProfileModal.show();
  };

  // function for closing all modals
  $closeModal = function() {
    $modal.hide();
  };

  //--- event Listeners ---
  $signUpLink.on('click', $openSignUpModal);
  $logInLink.on('click', $openlogInModal);
  $closeBtn.on('click', $closeModal);
  $editProfileLink.on('click', $openEditProfileModal);

  // ******************************* Angular ***********************************

  // this function will make a login request when called
  this.login = function(loginData) {
    // http request
    $http({
      method: 'POST',
      url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'users/login',
      data: {
        user: {
          username: loginData.username,
          password: loginData.password
        }
      }
    }).then(
      function(response) {
        console.log('***** in response ');
        console.log(response.data);
        if (response.data.status === 200) {
          // saves webtoken to local storage
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('username', JSON.stringify(response.data.user.username));
          localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
        } else {
          loginData.message = 'Sorry, the username and password you provided don\'t match our records.';
        }
      }.bind(this),
      function(error) {
        console.log('***** in error ');
        console.log(error);
        loginData.message = 'Sorry, something went wrong. Please try again later.';
      });
  };

  // this function will make a sign up request when called
  this.signUp = function(signUpData) {
    signUpData.message = '';
    if (signUpData.password === signUpData.confirmPassword) {
      $http({
        method: 'POST',
        url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'users',
        data: {
          user: {
            username: signUpData.username,
            password: signUpData.password
          }
        }
      }).then(
        function(response) {
          console.log(response.data)
          signUpData.username = '';
          signUpData.password = '';
          signUpData.confirmPassword = '';
          signUpData.message = 'Thank you, ' + response.data.user.username + '! Your profile was created. Please log in to continue.';
        }.bind(this),
        function(error) {
          console.log(error);
          signUpData.message = 'Sorry, something went wrong. Please try again later.';
        });
    } else {
      signUpData.message = 'Sorry, the passwords you entered did not match.';
    }
  };

  // this function will delete the webtoken from local storage
  this.logout = function() {
    localStorage.clear('token');
    $scope.userData = {};
    location.reload();
  };

  // this function will make a request to update a user's username
  this.editUsername = function(edited) {
    edited.message = '';
    console.log('editing username');
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/' + 'users/' + $scope.userData.id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')) 
      },
      data: {
        user: {
          username: edited.username
        }
      }
    }).then(
      function(response) {
        console.log(response);
        if (response.data.status === 200) {
          edited.username = '';
          localStorage.setItem('username', JSON.stringify(response.data.user.username));
          edited.message = 'Thank you, your username has been changed!';
        } else {
          edited.username = '';
          edited.message = 'Sorry, something went wrong. Your changes could not be saved.';
        }
      },
      function (error) {
        console.log(error);
        edited.username = '';
        edited.message = 'Sorry, something went wrong. Your changes could not be saved.';
      });
  };

}]);
