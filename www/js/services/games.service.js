(function () {
    var injectParams = ['$http', '$q'];

    var gamesDataService = function ($http, $q) {
        var urlBase = 'http://localhost:64789/api/games';
        var factory = {};

        factory.lista = function () {
            return $http.get(urlBase);
        };

        factory.getGame = function (gameId) {
            return $http.get(urlBase + '/' + gameId);
        };

        factory.insert = function (game) {
            return $http.post(urlBase, game)
                .then(function (results) {
                    return results.data;
                })
        };

        return factory;
    };

    gamesDataService.$inject = injectParams;

    angular.module('starter')
        .factory('gamesDataService', gamesDataService);
}());