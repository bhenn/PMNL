angular.module('starter.controllers')

.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$scope', '$timeout','$location','Auth','$state'];

function LoginCtrl($scope,$timeout,$location,Auth,$state){
  // Perform the login action when the user submits the login form

  $scope.loginData = {username: "",password:""};
  $scope.msgErro = "";
  $scope.loading = 'false';

  $scope.doLogin = function() {

    $scope.msgErro = "";
    $scope.loading = 'true';

    if ($scope.loginData.username == "admin" && $scope.loginData.password == "admin"){
      $timeout(function() {
        Auth.doLogin($scope.loginData);
        $state.go('app.ranking');
        //$location.path('/ranking');
        $scope.loading = 'false';
      }, 4000);
    }else{
      $scope.msgErro = "Usuário/senha inválidos";
      $scope.loading = 'false';
    }

  };
}