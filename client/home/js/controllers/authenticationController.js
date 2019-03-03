angular.module('authentication').controller('AuthenticationController', ['$scope', 'AuthenticationService' ,
  function($scope, AuthenticationService) {
    $scope.login = function() {
      AuthenticationService.login($scope.credentials).then( function(res) {
        //Do stuff
      }, function(err) {
        console.log('Invalid credentials:', err);
      });
    };

    $scope.register = function() {
      AuthenticationService.register($scope.newUser).then( function(res) {
        // Valid registration
      }, function(err) {
        console.log('Unable to create new user:', err);
      });
    };
  }
]);