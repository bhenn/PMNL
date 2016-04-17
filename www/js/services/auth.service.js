
(function () {
    var injectParams = ['$http', '$q','playerDataService'];

    var userService = function ($http, $q,playerDataService) {
        var factory = {};

        factory.setUser = function (user_data) {
                var user = JSON.stringify(user_data);
                var player = {
                  name: user_data.name,
                  facebookid: user_data.userID,
                  email: user_data.email
                };
                playerDataService.inclui(player);
                window.localStorage.starter_facebook_user = JSON.stringify(user_data);
        };

        factory.getUser = function () {
            return JSON.parse(window.localStorage.starter_facebook_user || '{}');
        };

        factory.logout = function(){
            window.localStorage.starter_facebook_user = "";
        };

        return factory;
    };

    userService.$inject = injectParams;

    angular.module('starter')
        .factory('userService', userService);
}());
