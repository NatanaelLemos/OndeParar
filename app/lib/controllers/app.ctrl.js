angularModule.controller('AppCtrl', function($scope, $ionicModal, $timeout, Facebook) {
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
    if($scope.loginWithFacebook){
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.signed = false;
          $scope.user = {};
          $scope.loginData = {};  
        });
      });
    }else{
      $scope.signed = false;
      $scope.user = {};
      $scope.loginData = {};
    }
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


  $scope.loginFacebook = function(){
    Facebook.login(function(response) {
      $scope.$apply(function() {
        console.log('facebook login response', response);
        getMyFacebookInfo(Facebook, function(myInfo){
          $scope.$apply(function() {
            $scope.loginWithFacebook = true;
            $scope.user = myInfo;
            $scope.signed = true;
            $scope.closeLogin();
          });
        });
      });
    });
  }

  $scope.init = function(){
    Facebook.getLoginStatus(function(response) {
      console.log(response);

      getMyFacebookInfo(Facebook, function(myInfo){
        if(myInfo){
          $scope.$apply(function(){
            $scope.user = myInfo;
            $scope.signed = true;
          });
        }
      });
    });  
  }
});

function getMyFacebookInfo(fbProvider, callBack){
  fbProvider.api('/me', function(myInfo) {
    console.log('facebook me', myInfo);
    callBack(myInfo);  
  });
}
