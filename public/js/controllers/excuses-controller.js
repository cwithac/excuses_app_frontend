angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.excuses = [];
  this.formData = {};
  this.occasion = []

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

  console.log(this.formData.occasion);

  this.createExcuse = function(){
  $http({
    method: 'POST',
    url: 'http://localhost:3000/excuses',
    data: {
      excuse: {
        content: this.formData.content,
        count: this.formData.count,
        occasion: this.formData.occasion
      }
    }
  }).then(function(response){
      console.log('New excuse: ', response);
      this.formData = {};
      this.getExcuses();
  }.bind(this));
  console.log(this.formData);
  console.log(this.formData.occasion);
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

  this.getExcuses();
  this.getOccasions();

}]); //excusesController END