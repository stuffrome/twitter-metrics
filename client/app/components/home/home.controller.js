angular.module('home')
    .controller('homeController', ['$scope',
        function($scope) {
            $scope.greeting = "Welcome Team 3!";
            $scope.subGreeting = "Let's get this done.";
        }
    ]);