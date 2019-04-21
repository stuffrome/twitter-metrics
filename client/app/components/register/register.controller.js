angular.module('register')
    .controller('registerController', ['$scope', '$location', 'authService',
        function($scope, $location, authService) {
            const defaultMessage = "Create an account! It's easy and free!";
            $scope.message = defaultMessage;

            $scope.register = function() {
                $scope.dupEmail = false;

                if ($scope.newUser.password != $scope.newUser.confirmPassword) {
                    $scope.passwordMismatch = true;
                }
                else {
                    $scope.passwordMismatch = false;

                    $scope.message = "Attempting to register your new account...";

                    authService.register($scope.newUser).then(function(res) {
                        $location.path("/login");
                    }, function(err) {
                        if (err.data.code == 11000) {
                            $scope.dupEmail = true;
                            $scope.message = defaultMessage;
                        }
                        else {
                            $scope.message = "Could not create account, please try again later!";
                        }
                    })
                }
            }
        }
    ]);