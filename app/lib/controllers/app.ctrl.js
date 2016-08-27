angularModule.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function(){
    $scope.signed = false;
    $scope.user = {};
    $scope.loginData = {};
  }

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    if($scope.loginData.email && $scope.loginData.password){
      $scope.signed = true;
      
      $scope.user = {
        name: "user"
      };

      $scope.closeLogin();
    }
  };
});