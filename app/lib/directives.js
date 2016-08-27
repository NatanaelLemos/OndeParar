angular.module('starter.directives', [])

.directive('map', ['$http', function($http) {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr, $rootScope) {

      function initialize() {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

          //deveria ter uma configuração para isso
          var mapRadius = 100;

          var mapOptions = {
            center: myLocation,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
          };

          var infoWindow= new google.maps.InfoWindow({
              content: ""
              });

          var buscarInformacoes = function(pos) {
                    $http({
                      method: 'GET',
                      url: 'https://onde-parar-api-enriquessp.c9users.io/api/v1/regioes/' + pos.lat() + '&' + pos.lng() + '?proximidade=' + mapRadius
                    }).then(function successCallback(response) {

                        infoWindow.setContent("<b>Vagas:</b> Algumas<br/>" +
                        "<b>Flanelinhas:</b>  " + response.data.incidenciaFlanelinha +"<br/>" +
                        "<b>Zona Azul:</b> " + (response.data.zonaAzul ? "Sim":"Não") +"<br/>" +
                        "<b>Risco de Inundação:</b> " + response.data.riscoInundacao +"<br/>" +
                        "<b>Região Perigosa:</b> " + (response.data.localidadePerigosa ? "Sim":"Não") +"<br/>");

                      }, function errorCallback(response) {

                      });
          };

          buscarInformacoes(myLocation);

          var map = new google.maps.Map($element[0], mapOptions);

          var populationOptions = {
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                clickable: true,
                fillColor: "#FFFFFF",
                fillOpacity: 0.5,
                map: map,
                center: myLocation,
                radius: mapRadius
            };


            infoWindow.setPosition(myLocation);
            infoWindow.open(map);

            var cityCircle = new google.maps.Circle(populationOptions);

            map.addListener('click', function(ev) {
              buscarInformacoes(ev.latLng);
              cityCircle.setCenter(ev.latLng);
              infoWindow.setPosition(ev.latLng);
              infoWindow.open(map);

            });

          $scope.onCreate({map: map});

          google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
            e.preventDefault();
            return false;
          });
        }, function (error) {
          alert('Unable to get location: ' + error.message);
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
}]);
