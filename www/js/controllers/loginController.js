angular.module('starter.controllers')

.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope', '$timeout','$location','$state','userService','$ionicLoading','$q','accountDataService'];

function LoginCtrl($scope,$timeout,$location,$state,userService,$ionicLoading,$q,accountDataService){

	$scope.msgErro = "";
	$scope.loading = 'false';


  var usuarioLogado = userService.getUser();
  if (!usuarioLogado.userID) {
  }else{
    $state.go('app.ranking');
  }
  // $state.go('app.ranking');

  $scope.loginFacebook = function() {
    $scope.msgErro = '';

    facebookConnectPlugin.getLoginStatus(function(success){
      if (success.status === 'connected'){
        armazenaUsuario(success.authResponse);
      }else{
        $ionicLoading.show({template: 'Logging in ...'});

        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };

  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
     fbLoginError("Cannot find the authResponse");
     return;
   }

   armazenaUsuario(response.authResponse);

 };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    if (error.errorCode != '4201'){
      $scope.msgErro = error;  
    }
    $ionicLoading.hide();
  };


  function armazenaUsuario(authResponse){
    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo){

      var player = {
        email: profileInfo.email,
        facebookId: authResponse.userID,
        faceAcessToken: authResponse.accessToken
      }

      var playerLocal = {
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
      }

      accountDataService.token(player)
      .then(function(data){

        userService.setUser(playerLocal);

        $state.go('app.ranking');
        $ionicLoading.hide();

      }, function(result){

        userService.logout();
        facebookConnectPlugin.logout();
        $ionicLoading.hide();
        console.log('err');
        console.log(result);
        $scope.msgErro = result.data;

      });
    });
  }


  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        info.resolve(response);
      },
      function (response) {
        info.reject(response);
      }
      );
    return info.promise;
  };

}