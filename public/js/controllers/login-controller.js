angular.module('excuses-app').controller('loginController', ['$http', '$scope',
function($http, $scope) {
  //************************* initialize Angular vars **************************

  // self var for allowing to call logout function in setTimeout
  var self = this;

  // message var for feedback for user
  this.msg = '';


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
    $closeModal();
    $signUpModal.show();
  };

  // function for opening log in modal
  $openlogInModal = function() {
    $closeModal();
    $logInModal.show();
  };

  // function for opening edit profile modal
  $openEditProfileModal = function() {
    $closeModal();
    $editProfileModal.show();
  };

  // function for closing all modals
  $closeModal = function() {
    $modal.hide();
    $scope.$apply(function(){
			self.msg = '';
		});
  };

  //--- event Listeners ---
  $signUpLink.on('click', $openSignUpModal);
  $logInLink.on('click', $openlogInModal);
  $closeBtn.on('click', $closeModal);
  $editProfileLink.on('click', $openEditProfileModal);

  // ******************************* Angular ***********************************

  // message var for feedback for user
  this.msg = '';

  // self var for allowing to call logout function in setTimeout
  var self = this;


  // this function will make a login request when called
  this.login = function(loginData) {
    // http request
    $http({
      method: 'POST',
      url: $scope.baseUrl + 'users/login',
      data: {
        user: {
          username: loginData.username,
          password: loginData.password
        }
      }
    }).then(
      function(response) {
        if (response.data.status === 200) {
          // saves webtoken to local storage
          localStorage.setItem('token', JSON.stringify(response.data.token))
          localStorage.setItem('username', JSON.stringify(response.data.user.username));
          localStorage.setItem('user_id', JSON.stringify(response.data.user.id));
          $scope.userIsLoggedIn();
          $scope.showButtons();
        } else {
          this.msg = 'Sorry, the username and password you provided don\'t match our records.';
        }
      }.bind(this),
      function(error) {
        this.msg = 'Sorry, something went wrong. Please try again later.';
      }.bind(this));
  };

  // this function will make a sign up request when called
  this.signUp = function(signUpData) {
    this.msg = '';
    if (signUpData.password === signUpData.confirmPassword) {
      $http({
        method: 'POST',
        url: $scope.baseUrl + 'users',
        data: {
          user: {
            username: signUpData.username,
            password: signUpData.password
          }
        }
      }).then(
        function(response) {
          if (response.data.status === 201) {
            signUpData.username = '';
            signUpData.password = '';
            signUpData.confirmPassword = '';
            this.msg = 'Thank you, ' + response.data.user.username + '! Your profile was created. Please log in to continue.';
          } else if (response.data.status === 422) {
            this.msg = 'Sorry, this username is already taken!';
          } else {
            this.msg = 'Sorry, something went wrong. Please try again later.';
          }
        }.bind(this),
        function(error) {
          console.log(error);
          this.msg = 'Sorry, something went wrong. Please try again later.';
        }.bind(this));
    } else {
      this.msg = 'Sorry, the passwords you entered did not match.';
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
    this.msg = '';
    console.log('editing username');
    $http({
      method: 'PATCH',
      url: $scope.baseUrl + 'users/' + $scope.userData.id,
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
          this.msg = 'Thank you, your username has been changed!';
          $scope.userIsLoggedIn();
        } else if (response.data.status === 422) {
          this.msg = 'Sorry, this username is already taken!';
        } else {
          edited.username = '';
          this.msg = 'Sorry, something went wrong. Your changes could not be saved.';
        }
      }.bind(this),
      function (error) {
        console.log(error);
        edited.username = '';
        this.msg = 'Sorry, something went wrong. Your changes could not be saved.';
      }.bind(this));
  };

  // this function will make a request to update a user's password
  this.editPassword = function(edited) {
    this.msg = '';
    console.log('editing password');
    if (edited.password === edited.confirmPassword) {
      $http({
        method: 'PATCH',
        url: $scope.baseUrl + 'users/' + $scope.userData.id,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {
          user: {
            password: edited.password
          }
        }
      }).then(
        function(response) {
          console.log(response);
          if (response.data.status === 200) {
            edited.password = '';
            edited.confirmPassword = '';
            this.msg = 'Thank you, your password has been changed!';
          } else {
            edited.password = '';
            edited.confirmPassword = '';
            this.msg = 'Sorry, something went wrong. Your changes could not be saved.';
          }
        }.bind(this),
        function (error) {
          console.log(error);
          edited.password = '';
          edited.confirmPassword = '';
          this.msg = 'Sorry, something went wrong. Your changes could not be saved.';
        }.bind(this));
    } else {
      edited.password = '';
      edited.confirmPassword = '';
      this.msg = 'Sorry, the passwords you entered do not match.';
    }
  };

  this.deleteProfile = function() {
    this.msg = '';
    $http({
      method: 'DELETE',
      url: $scope.baseUrl + 'users/' + $scope.userData.id,
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      },
      data: {
        user: {
          id: $scope.userData.id
        }
      }
    }).then(
      function(response) {
        console.log(response);
        if (response.data.status === 204) {
          this.msg = 'Thank you, your account has been deleted.';
          setTimeout(function(){self.logout();}, 1000);
        } else {
          this.msg = 'Sorry, something went wrong. Your profile was not deleted.';
        }
      }.bind(this),
      function (error) {
        console.log(error);
          this.msg = 'Sorry, something went wrong. Your profile was not deleted.';
      }.bind(this));
  };
}]);
