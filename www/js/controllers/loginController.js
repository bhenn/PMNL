angular.module('starter.controllers')

.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope', '$timeout','$location','Auth','$state', '$cordovaOauth','auth','store'];

function LoginCtrl($scope,$timeout,$location,Auth,$state,$cordovaOauth,auth,store){
  // Perform the login action when the user submits the login form

  if (Auth.logged()){
    $state.go('app.ranking');
  }

  $scope.loginData = {username: "admin",password:"admin"};
  $scope.msgErro = "";
  $scope.loading = 'false';

  $scope.doLogin = function() {

    $scope.msgErro = "";
    $scope.loading = 'true';

    if ($scope.loginData.username == "admin" && $scope.loginData.password == "admin"){
      $timeout(function() {
        Auth.doLogin($scope.loginData);
        $state.go('app.ranking');
        $scope.loading = 'false';
      }, 1000);
    }else{
      $scope.msgErro = "Usuário/senha inválidos";
      $scope.loading = 'false';
    }

  };

  $scope.loginFacebook = function(){
   // $cordovaOauth.facebook("1644507495810496", ["email"]).then(function(result) {
   //          alert('Logado');
   //        }, function(error) {
   //          alert('Erro ' + error);
   //        });

   auth.signin({
    authParams: {
      scope: 'openid offline_access',
      device: 'Mobile device'
    }
  }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $state.go('app.ranking');
      // console.log(profile);
      $location.path('/');
    }, function(error) {
      alert('Erro' + error);
    });
 }



}