angular.module('starter.controllers')

.controller('ElectionCtrl',ElectionCtrl);

ElectionCtrl.$inject = ['$scope', 'votesDataService','$q','$ionicLoading'];

function ElectionCtrl($scope,votesDataService,$q,$ionicLoading){

  $scope.show = function(){
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple" class="spinner-balanced"></ion-spinner>',
      delay: 100
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.doRefresh = function(){
    getVotes();
    $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.voteYes = function (id){
    votesDataService.voteYes(id);
  }

  $scope.voteNo = function (id){
    votesDataService.voteNo(id);
  }

  function init() {
    $scope.show();
    getVotes();
    $scope.hide();
  }

  function getVotes(){
   //var deferred = $q.defer();
   $scope.days = votesDataService.lista();
   
 };

init();

}