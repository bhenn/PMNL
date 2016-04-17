angular.module('starter.controllers')

.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$scope','$state','$window','$ionicViewService','userService','$ionicPopup'];

function AppCtrl($scope,$state,$window,$ionicViewService,userService,$ionicPopup){

	$scope.logout = function(){
		facebookConnectPlugin.logout(function(){
			userService.logout();
          	$state.go('login');
        });
	};

	$scope.votacao = function(){
		$ionicPopup.alert({
        title: 'OK',
        template: 'Em construção'
      }).then(function(){
        
      });


	};

}