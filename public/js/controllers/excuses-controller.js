angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.excuses = [];
  this.formData = {};
  this.occasion = []

  this.getExcuses = function() {
    $http({
      method: 'GET',
      url: $scope.baseUrl + 'relations',
    }).then(function(response){
      console.log('all relations', response);
      this.excuses = response.data;
    }.bind(this));
  };

  this.getOccasions = function() {
    $http({
      method: 'GET',
      url: $scope.baseUrl + 'occasions',
    }).then(function(response){
      console.log('all occasions', response);
      this.occasion = response.data.occasions;
    }.bind(this));
  };

  console.log(this.formData.occasion);

  this.createExcuse = function(){
  $http({
    method: 'POST',
    url: $scope.baseUrl + 'excuses',
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
      url: $scope.baseUrl + 'excuses/' + excuse.id,
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
     url: $scope.baseUrl + 'relations/'+ id,
    }).then(function(response){
     console.log("Deleted: ", response);
     this.getExcuses();
    }.bind(this));

  };

  this.getExcuses();
  this.getOccasions();

}]); //excusesController END
