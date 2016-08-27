angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr, $rootScope) {
      function initialize() {
        navigator.geolocation.getCurrentPosition(function (pos) {
          var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          
          var mapOptions = {
            center: myLocation,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
          };

          var map = new google.maps.Map($element[0], mapOptions);
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
});
