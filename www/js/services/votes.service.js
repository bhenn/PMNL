(function () {
    var injectParams = ['$http', '$q'];

    var votesDataService = function ($http, $q) {
        var urlBase = url + '/players';
        var factory = {};
        var daysDefault = [{date: "10/03/2016", totalvotes: 3, voted: true,votes: [{username: "Bruno"}, {username: "Felipe"}, {username: "Andrei"}]},
        {date: "12/03/2016", totalvotes: 2, voted: true, votes: [{username: "Bruno"}, {username: "Michel"}]},
        {date: "15/03/2016", totalvotes: 2, voted: false, votes: [{username: "Andrei"}, {username: "Cesar"}]}];

        factory.lista = function () {
            //return $http.get(urlBase);
            days = daysDefault.slice();
            return days;
        };

        factory.voteYes = function(id){
            var userIndex = objectFindByKey(days[id].votes,'username','Bruno');

            if (userIndex == null){
                days[id].totalvotes ++;
                days[id].voted = true;
                days[id].votes.push({username: "Bruno"});    
            }
            
        }

        factory.voteNo = function(id){
            var userIndex = objectFindByKey(days[id].votes,'username','Bruno');
            if (userIndex != null){
                days[id].votes.splice(userIndex,1) ;    
                days[id].totalvotes --;
                days[id].voted = false;
            }
        }


        function objectFindByKey(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return i;
                }
            }
            return null;
        }

        return factory;
    };

    votesDataService.$inject = injectParams;

    angular.module('starter')
    .factory('votesDataService', votesDataService);
}());