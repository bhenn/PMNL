angular.module('starter.controllers')

.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope', '$timeout','$location','$state','userService','$ionicLoading','$q'];

function LoginCtrl($scope,$timeout,$location,$state,userService,$ionicLoading,$q){

	$scope.msgErro = "";
	$scope.loading = 'false';


  var usuarioLogado = userService.getUser('facebook');
  if (!usuarioLogado.userID) {
  }else{
    $state.go('app.ranking');
  }


  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
     fbLoginError("Cannot find the authResponse");
     return;
   }

   var authResponse = response.authResponse;

   getFacebookProfileInfo(authResponse)
   .then(function(profileInfo) {
    var usuario = {
      authResponse: authResponse,
      userID: profileInfo.id,
      name: profileInfo.name,
      email: profileInfo.email,
      picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
    };

    userService.setUser(usuario)
    .then(function (result){
      if (result == 'OK'){
        $state.go('app.ranking');
      }else{
        $scope.msgErro = "Usuário não cadastrado !!!"
        facebookConnectPlugin.logout();
      }

          $ionicLoading.hide();
    });
  }, function(fail){
  	console.log('profile info fail', fail);
  	$scope.msgErro = fail;
  });
 };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
  	console.log('fbLoginError', error);
    if (error.errorCode != '4201'){
      $scope.msgErro = error;  
    }
    $ionicLoading.hide();
  };

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


    //This method is executed when the user press the "Login with facebook" button
    $scope.loginFacebook = function() {
      $scope.msgErro = '';

      facebookConnectPlugin.getLoginStatus(function(success){
        if(success.status === 'connected'){

    		// Check if we have our user saved
    		var user = userService.getUser('facebook');

    		if(!user.userID){
    			getFacebookProfileInfo(success.authResponse)
    			.then(function(profileInfo) {
						// For the purpose of this example I will store user data on local storage

            var usuario = {
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            };

            userService.setUser(usuario)
            .then(function (result){
              if (result == 'OK'){
                $state.go('app.ranking');
              }else{
               facebookConnectPlugin.logout();
               $scope.msgErro = "Usuário não cadastrado !!";
             }
           });
          }, function(fail){
						// Fail get profile info
						console.log('profile info fail', fail);
					});
    		}else{
    			$state.go('app.ranking');
    		}
    	} else {

        $ionicLoading.show({
         template: 'Logging in...'
       });

        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
    };

  }