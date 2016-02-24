angular.module('starter.controllers')

.controller('GameCtrl',GameCtrl);

GameCtrl.$inject = ['$scope', 'playerDataService','$q','$ionicLoading','gamesDataService','$stateParams'];

function GameCtrl($scope,gamesDataService,$q,$ionicLoading,gamesDataService,$stateParams){

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  function findGame(){
     var deferred = $q.defer();

    gamesDataService.getGame($stateParams.id)
    .then(function (result) {
        $scope.gameSelected = result.data;
        $scope.hide();
    });

    return deferred.promise;
  }

  function init() {
    findGame();
    $scope.show();
  }

  init();

}