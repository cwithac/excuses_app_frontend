angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.excuses = [];
  this.formData = {};

  this.getExcuses = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/relations',
    }).then(function(response){
      console.log('all relations', response);
      this.excuses = response.data;
    }.bind(this));
  };

  this.createExcuse = function(id){
  $http({
    method: 'POST',
    url: 'http://localhost:3000/excuses',
    data: this.formData
  }).then(function(response){
      console.log('new review', response);
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

}]); //excusesController END
