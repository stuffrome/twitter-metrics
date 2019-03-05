(function (angular) {
  'use strict';

  // Declare module dependencies for applicaiton
  angular.module('appRoutes', []);
  angular.module('home', []);
  angular.module('dashboard', []);

  // Declare application module and inject dependencies
  var app = angular.module('twitterMetrics', ['ngRoute', 'appRoutes', 'home', 'dashboard']);

})(window.angular);