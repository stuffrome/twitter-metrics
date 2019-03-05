(function (angular) {
  'use strict';

  // Declare module dependencies for applicaiton
  angular.module('appRoutes', []);
  angular.module('home', []);

  // Declare application module and inject dependencies
  var app = angular.module('twitterMetrics', ['ngRoute', 'appRoutes', 'home']);

})(window.angular);