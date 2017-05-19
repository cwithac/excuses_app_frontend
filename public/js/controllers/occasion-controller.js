angular.module('excuses-app').controller('occasionController', ['$http', '$scope',
function($http, $scope) {
  this.occasions = [];
  $http({
    method: 'GET',
    url: 'http://localhost:3000/occasions',
  }).then(function(response) {
    console.log(response);
    this.occasions = response.data.occasions;
  }.bind(this));
}]);
