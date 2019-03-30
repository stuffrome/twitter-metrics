angular.module('dashboard')
    .controller('dashboardController', ['$scope', '$location', 'authService', 'twitterService',
        function($scope, $location, authService, twitterService) {
            $scope.searchMessage = "Find Twitter data on tweets and users on any topic in any location.";

            $scope.searchType = "Topic";
            $scope.filterType = "recent";
            $scope.tweets = [];

            $scope.searchByTopic = function() {
                $scope.searchType = "Topic";
            }

            $scope.searchByLocation = function() {
                $scope.searchType = "Location";
            }

            $scope.filterByRecent = function() {
                $scope.filterType = "recent";
                $scope.searchRequest.result_type = "recent";
                $scope.search();
            }

            $scope.filterByPopular = function() {
                $scope.filterType = "popular";
                $scope.searchRequest.result_type = "popular";
                $scope.search();
            }

            $scope.filterByMixed = function() {
                $scope.filterType = "mixed";
                $scope.searchRequest.result_type = "mixed";
                $scope.search();
            }

            $scope.searchRequest = {
                q: "",
                result_type: "recent",
                count: 20
            }

            const defaultSearch = "University of Florida";

            var parseTweets = function(data) {
                var tweetsData = data.statuses;

                $scope.tweets = [];

                for (var i = 0; i < tweetsData.length; ++i)
                {
                    $scope.tweets[i] = {
                        user: tweetsData[i].user.name,
                        screen_name: tweetsData[i].user.screen_name,
                        caption: tweetsData[i].text,
                        likes: tweetsData[i].favorite_count,
                        retweets: tweetsData[i].retweet_count
                    }
                }
            }

            $scope.logout = function() {
                authService.logout().then(function(res) {
                    $location.path("/");
                }, function(err) {
                    $scope.message = "Could not log user out!";
                })
            }

            $scope.search = function() {
                if ($scope.searchRequest.q == "") {
                    $scope.searchRequest.q = defaultSearch;
                }
                twitterService.search($scope.searchRequest).then(function(res) {
                    parseTweets(res.data);
                }, function(err) {
                    // Handle error
                })
            }

            /* --- Initialization --- */

            // Default search
            $scope.search();
        }
    ]);