/* register the modules the application depends upon here*/
angular.module('authentication', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('twitterMetricsApp', ['authentication']);