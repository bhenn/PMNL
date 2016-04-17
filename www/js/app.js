// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
 'ionic.service.core',
 'starter.controllers',
 'ngCordova'])

.run(function($ionicPlatform,$location,$rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }


    
  });

  
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AppCtrl'
  })

  .state('app', {
    abstract: true, 
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.ranking', {
    url: '/ranking',
    views: {
      'menuContent': {
        templateUrl: 'templates/ranking.html',
        controller: 'RankingCtrl'
      }
    }
  })

  .state('app.players', {
    url: '/players',
    views: {
      'menuContent': {
        templateUrl: 'templates/players.html',
        controller: 'PlayersCtrl'
      }
    }
  })

  .state('app.player', {
    url: '/players/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/player.html',
        controller: 'PlayerCtrl'
      }
    }
  })

  .state('app.games', {
    url: '/games',
    views: {
      'menuContent': {
        templateUrl: 'templates/games.html',
        controller: 'GamesCtrl'
      }
    }
  })

  .state('app.game', {
    url: '/games/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/game.html',
        controller: 'GameCtrl'
      }
    }
  })

  .state('app.election', {
    url: '/election',
    views: {
      'menuContent': {
        templateUrl: 'templates/election.html',
        controller: 'ElectionCtrl'
      }
    }
  })

  .state('app.update', {
    url: '/update',
    views: {
      'menuContent': {
        templateUrl: 'templates/update.html',
        controller: 'DashCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
