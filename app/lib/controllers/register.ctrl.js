angularModule.controller('RegisterCtrl', ['$scope', '$http', '$ionicLoading', '$ionicPopup', '$location', function($scope, $http, $ionicLoading, $ionicPopup, $location) {

  $scope.localAtual = "";

$scope.obj = {};

  $scope.submeter = function() {

    $ionicLoading.show({content: 'Enviando informações...',showBackdrop: false});

    $http({
      method: 'POST',
      url: 'https://onde-parar-api-enriquessp.c9users.io/api/v1/enderecos/' + $scope.posAtual.lat() + '&' + $scope.posAtual.lng() + '/vagas',
      data: $scope.obj
    }).then(function successCallback(response) {
        $ionicLoading.hide();

        $ionicPopup.alert({
                title: 'Sucesso!',
                template: 'Suas informações foram enviadas para o servidor! Obrigado por colaborar.'
            });
        
        $location.path('#/app/map');

      }, function errorCallback(response) {
        $ionicLoading.hide();
        alert("Ocorreu um erro ao submeter");
      });



  };

  $scope.getLocation(function(pos) {

    var geocoder = new google.maps.Geocoder();

    $scope.posAtual = pos;

    geocoder.geocode({
      latLng: pos
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {

          $scope.localAtual = results[1].formatted_address;

        } else {
          $scope.localAtual = "Endereço não localizado";
        }
      } else {
        $scope.localAtual = "Endereço não localizado";
      }
    });

  });
}]);
