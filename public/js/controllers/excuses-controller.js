angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.excuses = [];
  this.formData = {};
  this.occasion = [];
  this.addForm = false;
  this.editForm = false;
  this.initialCount = 1;

  this.getExcuses = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/relations',
    }).then(function(response){
      console.log('all relations', response);
      this.excuses = response.data;
    }.bind(this));
  };

  this.getOccasions = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/occasions',
    }).then(function(response){
      console.log('all occasions', response);
      this.occasion = response.data.occasions;
    }.bind(this));
  };

  this.createExcuse = function(){
  $http({
    method: 'POST',
    url: 'http://localhost:3000/excuses',
    data: {
      excuse: {
        content: this.formData.content,
        count: this.initialCount,
        occasion: this.formData.occasion
      }
    }
  }).then(function(response){
      console.log('New excuse: ', response);
      this.formData = {};
      this.getExcuses();
  }.bind(this));
};

  this.updateExcuse = function(excuse) {
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/excuses/' + excuse.id,
      data: {
        excuse: {
          content: excuse.content
        }
      }
    }).then(function(response){

    }.bind(this));
    console.log(excuse);
  };

  this.deleteExcuse = function(id){
    $http({
     method: 'DELETE',
     url: 'http://localhost:3000/relations/'+ id,
    }).then(function(response){
     console.log("Deleted: ", response);
     this.getExcuses();
    }.bind(this));

  };

<<<<<<< HEAD
=======
  this.showAddForm = function() {
    console.log(this.addForm);
    this.addForm = true;
    console.log(this.addForm);
  };

  this.cancelAddForm = function() {
    console.log(this.addForm);
    this.addForm = false;
    console.log(this.addForm);
  }

  this.showEditForm = function() {
    console.log(this.editForm);
    this.editForm = true;
    console.log(this.editForm);
  };

  this.cancelEditForm = function() {
    console.log(this.addForm);
    this.editForm = false;
    console.log(this.addForm);
  }

  this.getExcuses();
  this.getOccasions();

}]); //excusesController END
