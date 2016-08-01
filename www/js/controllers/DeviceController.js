(function(){
  angular.module('starter')
  .controller('DeviceController', ['$scope', '$state', '$stateParams', 'DeviceFactory', DeviceController]);

  function DeviceController($scope, $state, $stateParams, DeviceFactory){

    var me = this;

    var service_id = '12ab';
    var characteristic_id = '34cd';

    me.attendee = {
      firstname: '',
      lastname: ''
    }

    $scope.init = function(){
      $scope.device = DeviceFactory.getDevice($stateParams.id);
    }

    $scope.attend = function(){

      ble.write(
        $stateParams.id,
        service_id,
        characteristic_id,
        btoa(JSON.stringify(me.attendee)),
        function(response){
          if(response == 'OK'){
            alert("Your attendance is recorded!");
            ble.disconnect($stateParams.id);
            $state.go('home');
          }
        },
        function(err){
          alert("Error occured while trying to record your attendance. Please try again.");
        }
      );
    }

    $scope.backToHome = function(){
      $state.go('home');
      ble.disconnect($stateParams.id);
    }

  }

})();
