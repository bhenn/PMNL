angular.module('starter.controllers')

.controller('GameInsertCtrl',GameInsertCtrl);

GameInsertCtrl.$inject = ['$scope', 'gamesDataService','$q','$ionicLoading','playerDataService','$cordovaTouchID','$ionicModal','$filter','$ionicPopup','userService'];

function GameInsertCtrl($scope,gamesDataService,$q,$ionicLoading,playerDataService,$cordovaTouchID,$ionicModal,$filter,$ionicPopup,userService){

  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.game = {descricao: "", date: ""};
  $scope.canInsert = userService.getUser('facebook').canInsert;

  var playerRankingOriginal = [];

  $ionicModal.fromTemplateUrl('templates/ranking-preview.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openPreview = function(){
    generatePreview();
    $scope.modal.show();
  }
  $scope.closePreview = function(){
    $scope.modal.hide();
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

  $scope.removeItem = function(index){
    if ($scope.players.length == 5){
      $ionicPopup.alert({
        title: 'Erro',
        template: 'O mínimo de jogadores é 5'
      });
    }else{
      $scope.players.splice(index, 1)  
    }
  };

  $scope.eliminate = function(player){
    player.eliminado = !player.eliminado;
  };

  $scope.canReorder = function(){
    $scope.shouldShowReorder = !$scope.shouldShowReorder;

  }


  $scope.moveItem = function(player, fromIndex, toIndex) {
   $scope.players.splice(fromIndex, 1);
   $scope.players.splice(toIndex, 0, player);
  };

 $scope.insertGame = function(){
  $scope.show();
  var deferred = $q.defer();
  var gameResult = [];

  for (var i = 0; i < $scope.players.length; i++) {
   gameResult.push({playerid: $scope.players[i].id, order: i+1});
 };

 var game = {
  description: $scope.game.descricao,
  date: $scope.game.date,
  gamesresults: gameResult
};

gamesDataService.insert(game)
.then(function (result) {

  $ionicPopup.alert({
    title: 'OK',
    template: 'Rodada Incluída'
  }).then(function(){
    $scope.restart();
    $scope.doRefresh();
    $scope.closeGameInsert();
  });

})
.catch(function(data){
  $ionicPopup.alert({
    title: 'Erro',
    template: data.data.message
  })
  .then(function(){
    $scope.restart();
  });
})
.finally(function(){
  $scope.hide();  
});

return deferred.promise; 
}

$scope.restart = function(){
  $scope.game.descricao ="";
  $scope.game.date ="";
  init();
}

function getPlayers() {
  var deferred = $q.defer();

  playerDataService.lista()
  .then(function (result) {
    $scope.players = result.data;
    playerRankingOriginal = angular.copy(result.data);
    $scope.hide();
  });

  return deferred.promise;
}

function init() {
  $scope.show();
  getPlayers();
}

function generatePreview(){
  $scope.playersPreview = angular.copy(playerRankingOriginal);

  for (var i = 0; i < $scope.players.length; i++) {
    var playerFound = $filter('filter')($scope.playersPreview ,{id : $scope.players[i].id});
    playerFound[0].points += getPoints($scope.players.length, i);
  };
}

function getPoints(players,position){
  return pontuacao[players - 5][position];
}

init();

}