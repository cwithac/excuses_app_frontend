angular.module('excuses-app').controller('occasionController', ['$http', '$scope',
function($http, $scope) {

  $http({
    method: 'GET',
    url: /*$scope.baseUrl*/ 'http://localhost:3000/' + 'occasions',
  }).then(function(response) {
    console.log(response);
    if (response.data.status === 200) {
      $scope.occasions = response.data.occasions;
    } else {
      console.log('message: oops');
    }

  }.bind(this));


}]);
