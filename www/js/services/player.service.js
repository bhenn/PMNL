(function () {
    var injectParams = ['$http', '$q'];

    var playerDataService = function ($http, $q) {
        var urlBase = 'http://localhost:64789/api/players';
        var factory = {};

        factory.lista = function () {
            return $http.get(urlBase);
        };

        // factory.getMunicipio = function (codMunicipio) {
        //     return $http.get(urlBase + '/' + codMunicipio);
        // };

        // factory.altera = function (municipio) {
        //     return $http.put(urlBase + '/' + municipio.munId, municipio)
        //         .then(function (results) {
        //             return results.data;
        //         });
        // };

        return factory;
    };

    playerDataService.$inject = injectParams;

    angular.module('starter')
        .factory('playerDataService', playerDataService);
}());