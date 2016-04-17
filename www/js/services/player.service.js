(function () {
    var injectParams = ['$http', '$q'];

    var playerDataService = function ($http, $q) {
        var urlBase = url + '/players';
        var factory = {};

        factory.lista = function () {
            return $http.get(urlBase);
        };


        factory.inclui = function(player){
            return $http.post(urlBase, player)
                .then(function(results){
                    return results.data;
                });
        }

        return factory;
    };

    playerDataService.$inject = injectParams;

    angular.module('starter')
        .factory('playerDataService', playerDataService);
}());