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

  this.createExcuse = function(){
  $http({
    method: 'POST',
    url: 'http://localhost:3000/excuses',
    data: this.formData
  }).then(function(response){
      console.log('New excuse: ', response);
      this.formData = {};
      this.getExcuses();
  }.bind(this));
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
