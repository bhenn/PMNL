angular.module('starter.controllers')

.controller('GameInsertCtrl',GameInsertCtrl);

GameInsertCtrl.$inject = ['$scope', 'gamesDataService','$q','$ionicLoading','playerDataService','$cordovaTouchID','$ionicModal','$filter'];

function GameInsertCtrl($scope,gamesDataService,$q,$ionicLoading,playerDataService,$cordovaTouchID,$ionicModal,$filter){

  $scope.shouldShowReorder = true;
  $scope.listCanSwipe = true;
  $scope.shouldShowDelete = true;
  $scope.game = {descricao: "", date: ""};

  var playerRankingOriginal = [];

  $ionicModal.fromTemplateUrl('templates/ranking-preview.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function(){
    generatePreview();
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.show = function(){
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.moveItem = function(player, fromIndex, toIndex) {
     $scope.players.splice(fromIndex, 1);
     $scope.players.splice(toIndex, 0, player);
  };

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

  $scope.insertGame = function(){
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
      alert('incluido');
    });

    return deferred.promise; 
  }

  $scope.restart = function(){
    $scope.game.descricao ="";
    $scope.game.date ="";
    init();
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

  // $scope.vibra = function (){
  //   $cordovaTouchID.checkSupport().then(function() {
  //       validaID();        
  //     }, function (error) {
  //       alert(error);
  //     });    
  // }

  // function validaID(){
  //   try{
  //     $cordovaTouchID.authenticate("text").then(function() {
  //       alert('deboas');
  //     }, function (err) {
  //       alert('Não deu' + err);  
  //     });
  //   }catch(err){
  //     alert(err);      
  //   }
  // }

  init();
  
}