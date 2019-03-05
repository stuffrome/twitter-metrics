angular.module('dashboard')
    .controller('dashboardController', ['$scope',
        function($scope) {
            $scope.greeting = "API Dashboard";
        }
    ]);