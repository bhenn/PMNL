angular.module('starter.controllers')

.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$scope','$location','$window','Auth','$ionicViewService'];

function AppCtrl($scope,$location,$window,Auth,$ionicViewService){

	if (Auth.logged()){
		$location.path('/ranking');
	}else{
		$location.path('/login');
	}

	$scope.logOut = function(){
		Auth.logout();
		$location.path('/login');
	}
}