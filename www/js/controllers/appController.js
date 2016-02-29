angular.module('starter.controllers')

.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$scope','$location','$window','Auth','$ionicViewService'];

function AppCtrl($scope,$location,$window,Auth,$ionicViewService){

	$scope.logOut = function(){
		Auth.logout();
		$location.path('/login');
	}


}