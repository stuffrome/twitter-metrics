angular.module('login')
    .controller('loginController', ['$scope', '$location', 'authService',
        function($scope, $location, authService) {
            $scope.message = "Please login with your account or register.";

            $scope.login = function() {
                authService.login($scope.credentials).then(function(res) {
                    $scope.message = "Success";
                    $location.path("/dashboard");
                }, function(err) {
                    $scope.message = "Invalid username/password";
                })
            }
        }
    ]);