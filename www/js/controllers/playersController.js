angular.module('starter.controllers')

.controller('PlayersCtrl',PlayersCtrl);

PlayersCtrl.$inject = ['$scope', 'playerDataService','$q','$ionicLoading'];

function PlayersCtrl($scope,playerDataService,$q,$ionicLoading){


  $scope.doRefresh = function(){
    getPlayers();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  function init() {
    $scope.show();
    getPlayers();
  }



  function getPlayers() {
    var deferred = $q.defer();

    playerDataService.lista().then(function (result) {
        $scope.players = result.data;
        $scope.hide();
    }, function(err){
        $scope.erro = "Erro -> " + err.statusText;
        $scope.hide();
    });

    return deferred.promise;
  }

  init();

}