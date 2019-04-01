angular.module('login')
    .controller('loginController', ['$rootScope', '$scope', '$location', 'authService',
        function($rootScope, $scope, $location, authService) {
            $scope.message = "Please login with your account or register.";

            $scope.login = function() {
                authService.login($scope.credentials).then(function(res) {
                    $scope.message = "Success";
                    $rootScope.currentUser = $scope.credentials.email;
                    $location.path("/dashboard");
                }, function(err) {
                    $scope.message = "Invalid username/password";
                })
            }
        }
    ]);