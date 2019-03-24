angular.module('dashboard')
    .controller('dashboardController', ['$scope', '$location', 'authService',
        function($scope, $location, authService) {
            $scope.greeting = "API Dashboard";

            $scope.logout = function() {
                authService.logout().then(function(res) {
                    console.log
                    $location.path("/");
                }, function(err) {
                    $scope.message = "Could not log user out!";
                })
            }
        }
    ]);