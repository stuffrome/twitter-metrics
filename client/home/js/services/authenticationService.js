angular.module('authentication').service('AuthenticationService', function($http, $localStorage) {
    this.login = function(credentials) {
        return $http.post('/api/auth/login', credentials)
    };
    this.register = function(newUser) {
        return $http.post('/api/auth/register', newUser)
    };
});