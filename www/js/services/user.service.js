
(function () {
  var injectParams = ['$http', '$q','playerDataService'];

  var userService = function ($http, $q,playerDataService) {
    var factory = {};

    factory.setUser = function (user_data) {
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
