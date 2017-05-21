angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.excuses = [];
  this.formData = {};
  this.occasion = [];
  this.addForm = false;
  this.editForm = false;
  this.initialCount = 0;
  this.alert = '';

  this.getExcuses = function() {
    $http({
      method: 'GET',
      url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'relations',
    }).then(function(response){
      console.log('all relations', response);
      this.excuses = response.data;
      for (var i = 0; i < this.excuses.length; i++) {
        this.excuses[i].excuse.editForm = false;
      }
      console.log(this.excuses);
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
        url: 'http://localhost:3000/excuses',
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        },
        data: {
          excuse: {
            content: this.formData.content,
            count: this.initialCount,
            occasion: this.formData.occasion,
            user_id: $scope.userData.id
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
      url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'excuses/' + excuse.id,
      data: {
        excuse: {
          content: excuse.content
        }
      }
    }).then(function(response){
      this.editForm = false;
    }.bind(this));
    console.log(excuse);
  };

  this.deleteExcuse = function(id){
    $http({
     method: 'DELETE',
     url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'relations/'+ id,
    }).then(function(response){
     console.log("Deleted: ", response);
     this.editForm = false;
     this.getExcuses();
    }.bind(this));

  };

  this.increaseCount = function(excuse) {
    excuse.excuse.count ++;
    console.log(excuse.excuse.count);
    console.log('excuse', excuse);
    $http({
      method: 'PATCH',
      url: 'http://localhost:3000/excuses/' + excuse.excuse_id,
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
