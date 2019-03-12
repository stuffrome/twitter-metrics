angular.module('appRoutes')
    .config(['$routeProvider', '$locationProvider',
      function ($routeProvider, $locationProvider) {
        $routeProvider
          // .when('/', {
          //   templateUrl: 'app/components/home/home.html',
          //   controller: 'homeController'
          // })
          .when('/', {
            templateUrl: 'app/components/login/login.html',
            controller: 'loginController'
          })
          .when('/register', {
            templateUrl: 'app/components/register/register.html',
            controller: 'registerController'
          })
          .when('/dashboard', {
            templateUrl: 'app/components/dashboard/dashboard.html',
            controller: 'dashboardController'
          })
          .otherwise({redirectTo: '/'});

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