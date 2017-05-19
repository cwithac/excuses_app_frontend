angular.module('excuses-app').controller('excusesController', ['$http', '$scope',
function($http, $scope) {

  this.test = "test"
  this.excuses = [];

    $http({
    method: 'GET',
    url: 'http://localhost:3000/relations',
  }).then(function(response){
    console.log('all relations', response);
    this.excuses = response.data;
  }.bind(this));


}]);
