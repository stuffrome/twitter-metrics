angular.module('twitter')
    .factory('twitterService', ['$http',
        function($http) {
            var methods = {
                searchTweets: function(searchRequest) {
                    return $http.post('/api/searchtweets', searchRequest);
                },
                searchTrends: function(searchRequest) {
                    return $http.post('/api/searchtrends', searchRequest);
                },
                searchUsers: function(searchRequest) {
                    return $http.post('/api/searchusers', searchRequest);
                }
            }

            return methods;
        }
    ])