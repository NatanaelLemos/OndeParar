angularModule.controller('SearchCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$location', function($scope, $ionicLoading, $ionicPopup, $location) {

  $scope.doSignup = function(){
    $http.post('https://onde-parar-api-enriquessp.c9users.io/api/v1/usuarios/', $scope.signup)
    .success(function (data, status, headers, config) {
        $location.url('#/app/map');
        
    })
    .error(function (data, status, header, config) {
    });
  }

}]);
