angular.module('geolocation')
    .factory('geolocationService', ['$http',
        function($http) {
            var methods = {
                getAll: function() {
                    return $http.get('/api/geolocation');
                },
                matchWith: function(token) {
                    return $http.post('/api/geolocation', token);
                }
            }

            return methods;
        }
    ])