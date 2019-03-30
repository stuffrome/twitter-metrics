angular.module('twitter')
    .factory('twitterService', ['$http',
        function($http) {
            var methods = {
                search: function(searchRequest) {
                    return $http.post('/api/search', searchRequest);
                }
            }

            return methods;
        }
    ])