angular.module('register')
    .controller('registerController', ['$scope', '$location', 'authService',
        function($scope, $location, authService) {
            $scope.message = "Create an account! It's easy and free!";

            $scope.register = function() {
                if ($scope.newUser.password != $scope.newUser.confirmPassword) {
                    $scope.passwordMismatch = true;
                }
                else {
                    $scope.passwordMismatch = false;

                    $scope.message = "Registering your new account...";

                    authService.register($scope.newUser).then(function(res) {
                        $scope.message = "Done!";
                        $location.path("/login");
                    }, function(err) {
                        console.log("Could not register user!");
                    })
                }
            }
        }
    ]);