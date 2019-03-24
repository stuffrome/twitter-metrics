angular.module('authentication')
    .factory('authService', ['$http',
        function($http) {
            var methods = {
                register: function(newUser) {
                    return $http.post('/api/register', newUser);
                },
                login: function(credentials) {
                    return $http.post('/api/login', credentials);
                },
                logout: function() {
                    return $http.get('/api/logout');
                }
            }

            return methods;
        }
    ])