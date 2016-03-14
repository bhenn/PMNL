angular.module('starter.controllers')

.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$scope','$location','$window','$ionicViewService','auth','store'];

function AppCtrl($scope,$location,$window,$ionicViewService,auth,store){

	$scope.auth = auth;

	$scope.logOut = function(){
		auth.signout();
		store.remove('profile');
		store.remove('token');
		$location.path('/login');
	}


}