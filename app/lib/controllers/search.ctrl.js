angularModule.controller('SearchCtrl', ['$scope', '$ionicLoading', '$ionicPopup', '$location', function($scope, $ionicLoading, $ionicPopup, $location) {

  $scope.submeter = function() {

      $location.path('#/app/map');

      $ionicPopup.alert({
              title: 'Não Implementado!',
              template: 'Em um futuro bem breve =).'
          });

  };

}]);
