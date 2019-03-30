(function (angular) {
  'use strict';

  // Declare module dependencies for applicaiton
  angular.module('appRoutes', []);
  angular.module('authentication', []);
  angular.module('twitter', []);
  angular.module('home', []);
  angular.module('login', ['authentication']);
  angular.module('register', ['authentication']);
  angular.module('dashboard', ['authentication', 'twitter']);

  // Declare application module and inject dependencies
  var app = angular.module('twitterMetrics', ['ngRoute',
                                              'appRoutes',
                                              'authentication',
                                              'twitter',
                                              'home',
                                              'login',
                                              'register',
                                              'dashboard']);

})(window.angular);