angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'facebook'])
.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //Retorna a rua mais próxima
  $rootScope.getLocation = function(callBack){
    navigator.geolocation.getCurrentPosition(function (pos) {

      var myLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      var directionsService = new google.maps.DirectionsService();

      directionsService.route({
        origin: myLocation,
        destination: myLocation,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK)
        {
          callBack(response.routes[0].legs[0].start_location);
        } else {
          callBack(homeLatlng);
        }
      });
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  }
})
.config(function($stateProvider, $urlRouterProvider, FacebookProvider) {

  FacebookProvider.init('1765573993727385');
  // FacebookProvider.init({
  //   appId: '1765573993727385',
  //   oauth: true,
  //   localSDK: '//connect.facebook.net/en_US/sdk.js', //Load sdk async
  //   nativeInterface: CDV.FB,
  //   status: false,
  //   frictionlessRequests: true,
  //   useCachedDialogs: false,
  //   cookies:true
  // },false);

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.signup', {
    url: '/signup',
    views: {
      templateUrl: 'templates/signup.html'
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html'
      }
    }
  })

  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});

var angularModule = angular.module('starter.controllers', ['ionic']);
