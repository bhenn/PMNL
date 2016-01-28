angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('RankingCtrl',function($scope) {
  $scope.players = [
  {name: 'Bruno', points: 45},
  {name: 'Felipe', points: 42},
  {name: 'Michel', points: 39},
  {name: 'Ismael', points: 33},
  ];

  $scope.doRefresh = function(){
    $scope.players.push({name: 'Paulo', points: 30});    
    $scope.$broadcast('scroll.refreshComplete');
  }

})


.controller('PlayersCtrl',function($scope, playerDataService,$q) {

  $scope.doRefresh = function(){
    getPlayers();
    $scope.$broadcast('scroll.refreshComplete');
  }

  function init() {
    getPlayers();
  }

  function getPlayers() {
    var deferred = $q.defer();

    playerDataService.lista()
    .then(function (result) {
        $scope.players = result.data;
    });

    return deferred.promise;
  }

  init();

})


.controller('GameCtrl',function($scope, playerDataService,$q) {

  $scope.shouldShowReorder = true;
  $scope.listCanSwipe = true;
  $scope.shouldShowDelete = true;

  $scope.games = [
    {description: 'Janeiro', date: '27/01/2016', winner: 'Bruno', id:'1'},
    {description: 'Fevereiro', date: '27/01/2016', winner: 'Andrei', id: '2'},
    {description: 'Março', date: '27/01/2016', winner: 'Michel', id: '3'}
  ];


  $scope.moveItem = function(player, fromIndex, toIndex) {
     $scope.players.splice(fromIndex, 1);
     $scope.players.splice(toIndex, 0, player);
  };

  function init() {
    getPlayers();
  }

  function getPlayers() {
    var deferred = $q.defer();

    playerDataService.lista()
    .then(function (result) {
        $scope.players = result.data;
    });

    return deferred.promise;
  }

  init();

});
