angular.module('appRoutes')
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'app/components/home/home.html'
          });

        $locationProvider.html5Mode(true);
      }
    ])
    .controller('viewController', ['$route', '$routeParams', '$location',
      function ($route, $routeParams, $location) {
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
      }
    ]);