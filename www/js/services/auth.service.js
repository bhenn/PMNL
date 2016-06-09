
(function () {
    var injectParams = ['$http', '$q','playerDataService'];

    var userService = function ($http, $q,playerDataService) {
        var factory = {};

        factory.setUser = function (user_data) {
            var player = {
              name: user_data.name,
              facebookid: user_data.userID,
              email: user_data.email
          };


          return playerDataService.inclui(player)
          .then(function (result){
            if (result.status == '201'){
                user_data.canInsert = result.data.admin;
                window.localStorage.starter_facebook_user = JSON.stringify(user_data);
                console.log(user_data.canInsert);
                return 'OK';
            }
            return null;
        });

                // var retorno = playerDataService.inclui(player);
                // if (retorno == "OK"){
                //     console.log("Retorno OK do inclui");
                //     window.localStorage.starter_facebook_user = JSON.stringify(user_data);
                // }
                // return retorno;
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
