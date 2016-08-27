angularModule.controller('MapCtrl', function($scope, $ionicLoading) {
  $scope.mapCreated = function(map) {$scope.map = map;};

  $scope.centerOnMe = function () {
    $ionicLoading.show({content: 'Getting current location...',showBackdrop: false});

    $scope.getLocation(function (pos) {
      $scope.map.setCenter(pos);
      $ionicLoading.hide();
    });
  };

  $scope.reportParkingPlace = function(){
    $scope.getLocation(function (pos) {
      var geocoder = new google.maps.Geocoder();

      var postParkingPlace = function(place){
        alert('my location is: ' + place.formatted_address);
        console.log(place);
      };

      geocoder.geocode({
        latLng: pos
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            $scope.centerOnMe();
            postParkingPlace(results[1]);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  $scope.getNearParkingPlaces = function(){
    navigator.geolocation.getCurrentPosition(function(pos){

    });
  }
});
