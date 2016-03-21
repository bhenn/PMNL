angular.module('starter.controllers')

.controller('RulesCtrl', RulesCtrl);

RulesCtrl.$inject = ['$scope', 'gamesDataService','$q','$ionicLoading','$ionicModal'];

function RulesCtrl($scope,gamesDataService,$q,$ionicLoading,$ionicModal){

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.doRefresh = function(){
    $scope.$broadcast('scroll.refreshComplete');
  }

  function init() {
    //$scope.show();
  }

 init();

}