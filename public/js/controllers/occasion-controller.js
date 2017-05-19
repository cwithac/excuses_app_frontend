angular.module('excuses-app').controller('occasionController', ['$http', '$scope',
function($http, $scope) {
  this.occasions = [];
  $http({
    method: 'GET',
    url: $scope.baseUrl + 'occasions',
  }).then(function(response) {
    console.log(response);
    this.occasions = response.data.occasions;
  }.bind(this));
}]);
