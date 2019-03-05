angular.module('appRoutes')
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'app/components/home/home.html',
            controller: 'homeController'
          })
          .when('/dashboard', {
            templateUrl: 'app/components/dashboard/dashboard.html',
            controller: 'dashboardController'
          })
          .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
      }
    ])
    .controller('viewController', ['$route', '$routeParams', '$location',
      function ($route, $routeParams, $location) {
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
      }
    ]);