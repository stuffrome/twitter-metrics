(function (angular) {
  'use strict';

  // Declare module dependencies for applicaiton
  angular.module('appRoutes', []);
  angular.module('authentication', []);
  angular.module('home', []);
  angular.module('login', ['authentication']);
  angular.module('register', ['authentication']);
  angular.module('dashboard', ['authentication']);

  // Declare application module and inject dependencies
  var app = angular.module('twitterMetrics', ['ngRoute',
                                              'appRoutes',
                                              'authentication',
                                              'home',
                                              'login',
                                              'register',
                                              'dashboard']);

})(window.angular);