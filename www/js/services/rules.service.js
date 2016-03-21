(function () {
    var injectParams = ['$http', '$q'];

    var rulesDataService = function ($http, $q) {
        var urlBase = url + '/rules';
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

    rulesDataService.$inject = injectParams;

    angular.module('starter')
        .factory('rulesDataService', rulesDataService);
}());