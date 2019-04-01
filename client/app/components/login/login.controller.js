angular.module('login')
    .controller('loginController', ['$rootScope', '$scope', '$location', 'authService',
        function($rootScope, $scope, $location, authService) {
            $scope.message = "Please login with your account or register.";

            $scope.login = function() {

                $scope.invalidLogin = false;
                $scope.message = "Logging you in...";

                authService.login($scope.credentials).then(function(res) {
                    $rootScope.currentUser = $scope.credentials.email;
                    $location.path("/dashboard");
                }, function(err) {
                    $scope.invalidLogin = true;
                    $scope.message = "Invalid username/password";
                })
            }
        }
    ]);