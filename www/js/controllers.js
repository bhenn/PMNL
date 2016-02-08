// angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {
  
//   var deploy = new Ionic.Deploy();
  
//   // Update app code with new release from Ionic Deploy
//   $scope.doUpdate = function() {
//     deploy.update().then(function(res) {
//       console.log('Ionic Deploy: Update Success! ', res);
//     }, function(err) {
//       console.log('Ionic Deploy: Update error! ', err);
//     }, function(prog) {
//       console.log('Ionic Deploy: Progress... ', prog);
//     });
//   };

//   // Check Ionic Deploy for new code
//   $scope.checkForUpdates = function() {
//     console.log('Ionic Deploy: Checking for updates');
//     deploy.check().then(function(hasUpdate) {
//       console.log('Ionic Deploy: Update available: ' + hasUpdate);
//       $scope.hasUpdate = hasUpdate;
//     }, function(err) {
//       console.error('Ionic Deploy: Unable to check for updates', err);
//     });
//   }
// })

// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })


// .controller('RankingCtrl',function($scope,$ionicLoading,$q,playerDataService) {
  
//   function init() {
//     $scope.show();
//     getPlayers();
//   }

//   $scope.doRefresh = function(){
//     getPlayers();
//     $scope.$broadcast('scroll.refreshComplete');
//   }

//   $scope.show = function(){
//     $ionicLoading.show({
//       template: '<p>Loading...</p><ion-spinner></ion-spinner>',
//       delay: 100
//     });
//   };

//   $scope.hide = function(){
//     $ionicLoading.hide();
//   };

//   function getPlayers() {
//     var deferred = $q.defer();

//     playerDataService.lista().then(function (result) {
//         $scope.players = result.data;
//         $scope.hide();
//     }, function(err){
//         $scope.erro = "Erro -> " + err.statusText;
//         $scope.hide();
//     });

//     return deferred.promise;
//   }

//   init();

// })


// .controller('PlayersCtrl',function($scope, playerDataService,$q, $ionicLoading) {

//   $scope.doRefresh = function(){
//     getPlayers();
//     $scope.$broadcast('scroll.refreshComplete');
//   }

//   $scope.show = function(){
//     $ionicLoading.show({
//       template: '<p>Loading...</p><ion-spinner></ion-spinner>',
//       delay: 100
//     });
//   };

//   $scope.hide = function(){
//     $ionicLoading.hide();
//   };

//   function init() {
//     $scope.show();
//     getPlayers();
//   }



//   function getPlayers() {
//     var deferred = $q.defer();

//     playerDataService.lista().then(function (result) {
//         $scope.players = result.data;
//         $scope.hide();
//     }, function(err){
//         $scope.erro = "Erro -> " + err.statusText;
//         $scope.hide();
//     });

//     return deferred.promise;
//   }

//   init();

// })

// .controller('GamesCtrl',function($scope, gamesDataService,$q,$ionicLoading) {

//   $scope.show = function(){
//     $ionicLoading.show({
//       template: '<p>Loading...</p><ion-spinner></ion-spinner>',
//       delay: 100
//     });
//   };

//   $scope.hide = function(){
//     $ionicLoading.hide();
//   };

//   $scope.doRefresh = function(){
//     getGames();
//     $scope.$broadcast('scroll.refreshComplete');
//   }


//   function init() {
//     $scope.show();
//     getGames();
//   }

//   function getGames(){
//    var deferred = $q.defer();

//     gamesDataService.lista()
//     .then(function (result) {
//         $scope.games = result.data;
//         $scope.hide();
//     });

//     return deferred.promise; 
//   }

//   init();
// })

// .controller('GameInsertCtrl',function($scope, gamesDataService,$q,$ionicLoading,playerDataService,$cordovaTouchID,$ionicModal) {
//   $scope.shouldShowReorder = true;
//   $scope.listCanSwipe = true;
//   $scope.shouldShowDelete = true;
//   $scope.game = {descricao: "", date: ""};

//   $ionicModal.fromTemplateUrl('templates/ranking-preview.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.modal = modal
//   })

//   $scope.openModal = function(){
//     $scope.playersPreview = $scope.players;
//     $scope.modal.show();
//   }
//   $scope.closeModal = function(){
//     $scope.modal.hide();
//   }

//   $scope.show = function(){
//     $ionicLoading.show({
//       template: '<p>Loading...</p><ion-spinner></ion-spinner>',
//       delay: 100
//     });
//   };

//   $scope.hide = function(){
//     $ionicLoading.hide();
//   };

//   $scope.moveItem = function(player, fromIndex, toIndex) {
//      $scope.players.splice(fromIndex, 1);
//      $scope.players.splice(toIndex, 0, player);
//   };

//   function getPlayers() {
//     var deferred = $q.defer();

//     playerDataService.lista()
//     .then(function (result) {
//         $scope.players = result.data;
//         $scope.hide();
//     });

//     return deferred.promise;
//   }

//   $scope.insertGame = function(){
//    var deferred = $q.defer();

//     var gameResult = [];

//     for (var i = 0; i < $scope.players.length; i++) {
//      gameResult.push({playerid: $scope.players[i].id, order: i+1});
//     };

//     var game = {
//       description: $scope.game.descricao,
//       date: $scope.game.date,
//       gamesresults: gameResult
//     };

//     gamesDataService.insert(game)
//     .then(function (result) {
//       alert('incluido');
//     });

//     return deferred.promise; 
//   }

//   $scope.restart = function(){
//     $scope.game.descricao ="";
//     $scope.game.date ="";
//     init();
//   }


//   function init() {
//     $scope.show();
//     getPlayers();
//   }

//   $scope.vibra = function (){
//     $cordovaTouchID.checkSupport().then(function() {
//         validaID();        
//       }, function (error) {
//         alert(error);
//       });    
//   }

//   function validaID(){
//     try{
//       $cordovaTouchID.authenticate("text").then(function() {
//         alert('deboas');
//       }, function (err) {
//         alert('Não deu' + err);  
//       });
//     }catch(err){
//       alert(err);      
//     }
//   }

//   init();
// })

// .controller('GameCtrl',function($scope, playerDataService,$q,$ionicLoading,$timeout, gamesDataService,$stateParams) {

//   $scope.show = function(){
//     $ionicLoading.show({
//       template: '<p>Loading...</p><ion-spinner></ion-spinner>',
//       delay: 100
//     });
//   };

//   $scope.hide = function(){
//     $ionicLoading.hide();
//   };

//   function findGame(){
//      var deferred = $q.defer();

//     gamesDataService.getGame($stateParams.id)
//     .then(function (result) {
//         $scope.gameSelected = result.data;
//         $scope.hide();
//     });

//     return deferred.promise;
//   }

//   function init() {
//     findGame();
//     $scope.show();
//   }

//   init();

// });
