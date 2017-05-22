angular.module('excuses-app').controller('excusesController', ['$http', '$scope', 'sorterFilter',
function($http, $scope, userFilter) {

  // this.excuses = [];
  this.formData = {};
  this.occasion = [];
  this.addForm = false;
  // excuse.excuse.editForm = false;
  this.initialCount = 0;
  this.alert = '';
  this.editButton = false;
  this.deleteButton = false;

  // this.showButtons = function() {
  //   var currentUser = $scope.userData.id;
  //   var excuseList = this.excuses;
  //   console.log(excuseList);
  //     for (var i = 0; i < excuseList.length; i++) {
  //       if (currentUser === excuseList[i].excuse.user_id) {
  //         excuseList[i].excuse.editButton = true;
  //         excuseList[i].excuse.deleteButton = true;
  //     } else {
  //         console.log('else statement');
  //         excuseList[i].excuse.editButton = false;
  //         excuseList[i].excuse.deleteButton = false;
  //     }
  //   };
  // };

  this.getExcuses = function() {
    $http({
      method: 'GET',
      url: $scope.baseUrl + 'relations',
    }).then(function(response){
      console.log('all relations', response);
      $scope.excuses = response.data;
      for (var i = 0; i < $scope.excuses.length; i++) {
        $scope.excuses[i].excuse.editForm = false;
      }
      console.log($scope.excuses);
      $scope.showButtons();
    }.bind(this));
  };

  // this.getOccasions = function() {
  //   $http({
  //     method: 'GET',
  //     url: 'http://localhost:3000/occasions',
  //   }).then(function(response){
  //     console.log('all occasions', response);
  //     this.occasion = response.data.occasions;
  //   }.bind(this));
  // };

  this.createExcuse = function(){
    console.log(this.formData.occasion);
    this.alert = '';
    if (this.formData.occasion && this.formData.content && this.formData.content.trim() !== '') {
      console.log('inside if');
      $http({
        method: 'POST',
        url: $scope.baseUrl + 'excuses',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {
          excuse: {
            content: this.formData.content,
            count: this.initialCount,
            occasion: this.formData.occasion,
            user_id: $scope.userData.id
          },
          user: {
            id: $scope.userData.id
          }
        }
      }).then(function(response){
        if (response.data.status === 201){
          console.log('New excuse: ', response);
          this.formData = {};
          this.addForm = false;
          this.getExcuses();
        } else {
          console.log('something went wrong');
          console.log('response data', response.data);
        }
      }.bind(this), function(error){
        console.log(error);
        console.log('something went wrong');
      });
    } else {
      console.log('occasion empty');
      this.alert = "Please try again."
    } //END IF
  };

  this.updateExcuse = function(excuse) {
    $http({
      method: 'PUT',
      url: $scope.baseUrl + 'excuses/' + excuse.id,
      headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
      data: {
        excuse: {
          content: excuse.content
        },
      }
    }).then(function(response){
      console.log('inside promise');
      console.log('excuse', excuse);
      excuse.editForm = false;
    }.bind(this));
    console.log(excuse);
  };

  this.deleteExcuse = function(excuse){
    $http({
     method: 'DELETE',
     url: $scope.baseUrl + 'relations/' + excuse.id,
     headers: {
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
     }
    }).then(function(response){
     console.log("Deleted: ", response);
     excuse.excuse.editForm = false;
     this.getExcuses();
    }.bind(this));

  };

  this.increaseCount = function(excuse) {
    excuse.excuse.count ++;
    console.log(excuse.excuse.count);
    console.log('excuse', excuse);
    $http({
      method: 'PATCH',
      url: $scope.baseUrl + 'excuses/'+ excuse.excuse_id + '/upvote',
      data: {
        excuse: {
          count: excuse.excuse.count
        }
      }
    }).then(function(response){
      console.log(response.data);
    }.bind(this));
  };


  this.showAddForm = function() {
    this.addForm = true;
  };

  this.cancelAddForm = function() {
    this.addForm = false;
  }

  this.showEditForm = function(excuse) {
    console.log(excuse);
    excuse.excuse.editForm = true;
  };

  this.cancelEditForm = function(excuse) {
    console.log(excuse);
    excuse.excuse.editForm = false;
  }

  this.getExcuses();
  // $scope.getOccasions();

}]); //excusesController END
