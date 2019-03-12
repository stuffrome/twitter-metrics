angular.module('register')
    .controller('registerController', ['$scope', '$location', 'authService',
        function($scope, $location, authService) {
            $scope.message = "Create an account! It's easy and free!";

            $scope.register = function() {
                authService.register($scope.newUser).then(function(res) {
                    $scope.message = "Success!";
                    $location.path("/login");
                }, function(err) {
                    console.log("Could not register user!");
                })
            }
        }
    ]);