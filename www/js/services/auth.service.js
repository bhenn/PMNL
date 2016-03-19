// angular.module('starter.services', [])

// .service('Auth', Auth);

// Auth.$inject = ['$http', '$q','$window'];

// function Auth($http,$q,$window){

//     var factory = {};

//     factory.logged = function(){
//         if ($window.localStorage.user == undefined || $window.localStorage.user == "undefined" || $window.localStorage.user == null || $window.localStorage.user == "null"){
//             return false;
//         }else{
//             return true;
//         }
//     }

//     factory.getUser = function(){
//         return JSON.parse($window.localStorage.user);
//     }

//     factory.doLogin = function(credentials){
//         $window.localStorage.user = JSON.stringify(credentials);
//     }

//     factory.logout = function(){
//         $window.localStorage.user = null;
//     }

//     return factory;
// }

angular.module('starter', [])
.service('UserService', function() {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});

