angular.module('starter.controllers')

.controller('GamesCtrl',GamesCtrl);

GamesCtrl.$inject = ['$scope', 'gamesDataService','$q','$ionicLoading','$ionicModal'];

function GamesCtrl($scope,gamesDataService,$q,$ionicLoading,$ionicModal){

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $ionicModal.fromTemplateUrl('templates/gameInsert.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openGameInsert = function(){
    $scope.modal.show();
  }
  $scope.closeGameInsert = function(){
    $scope.modal.hide();
  }

  $scope.doRefresh = function(){
    getGames();
    $scope.$broadcast('scroll.refreshComplete');
  }

  function init() {
    $scope.show();
    getGames();
  }


  function getGames(){
   var deferred = $q.defer();

   gamesDataService.lista()
   .then(function (result) {
    $scope.games = result.data;
    $scope.hide();
  });

   return deferred.promise; 
 }

 init();

}