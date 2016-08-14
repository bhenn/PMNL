(function () {
    var injectParams = ['$http', '$q'];

    var accountDataService = function ($http, $q) {
        var urlBase = url + '/account';
        var factory = {};

        factory.token = function (player) {
            return $http.post(urlBase,player);
        };


        return factory;
    };

    accountDataService.$inject = injectParams;

    angular.module('starter')
        .factory('accountDataService', accountDataService);
}());