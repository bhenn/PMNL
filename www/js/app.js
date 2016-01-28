// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
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
          controller: 'GameCtrl'
        }
      }
    })

    .state('app.gameInsert', {
      url: '/gameInsert',
      views: {
        'menuContent': {
          templateUrl: 'templates/gameInsert.html',
          controller: 'GameCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/ranking');
});
