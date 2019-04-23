angular.module('dashboard')
    .directive('tmAutocomplete', function() {
        return {
            restrict: "A",
            link: function(scope, elem) {
                elem.on('input', function() {
                    elem.autocomplete({
                        source: scope.locationList
                    });
                })
            }
        };
    })
    .controller('dashboardController', ['$rootScope', '$scope', '$location', 'authService', 'twitterService', 'geolocationService',
        function($rootScope, $scope, $location, authService, twitterService, geolocationService) {
            $scope.Math = window.Math;

            $scope.user = $rootScope.currentUser;

            // Search Bar

            $scope.searchMessage = "Search for tweets on a specific topic or the latest trends around the world.";

            $scope.searchValue = "";

            $scope.searchType = "Topic";

            $scope.searchByTopic = function() {
                $scope.searchType = "Topic";
                $scope.searchValue = "";
                $scope.search();
            }

            $scope.searchByLocation = function() {
                $scope.searchType = "Location";
                $scope.searchValue = "";
                $scope.search();
            }

            $scope.searchByUser = function() {
                $scope.searchType = "User";
                $scope.searchValue = "";
                $scope.search();
            }

            // Tweets display

            $scope.tweetFilter = "popular";
            $scope.tweetDisplayCount = 50;
            $scope.tweets = [];

            $scope.filterTweetsPopular = function() {
                $scope.tweetFilter = "popular";
                $scope.search();
            }

            $scope.filterTweetsRecent = function() {
                $scope.tweetFilter = "recent";
                $scope.search();
            }

            $scope.filterTweetsMixed = function() {
                $scope.tweetFilter = "mixed";
                $scope.search();
            }

            // Trend display

            $scope.trendFilter = "most";
            $scope.trends = [];

            $scope.maxVolume = 0;

            $scope.filterTrendsMost = function() {
                $scope.trendFilter = "most";
                $scope.search();
            }

            $scope.filterTrendsLeast = function() {
                $scope.trendFilter = "least";
                $scope.search();
            }

            // User display

            $scope.userFilter = "";
            $scope.users = [];

            var getUserTweets = function(user) {
                var tweets = [];

                $scope.status = user.screen_name;

                const request = {
                    screen_name: user.screen_name
                }

                twitterService.userTweets(request).then(function(result) {
                    const tweetsData = result.data;

                    for (var i = 0; i < tweetsData.length; ++i)
                    {
                        var tweetCaption = "";
                        var tweetTime = "";

                        const httpsSubstring = tweetsData[i].text.substring(tweetsData[i].text.length - 23, tweetsData[i].text.length - 18);

                        if (httpsSubstring == 'https') {
                            tweetCaption = tweetsData[i].text.substring(0,tweetsData[i].text.length - 23);
                        }
                        else {
                            tweetCaption = tweetsData[i].text;
                        }



                        tweetTime = tweetsData[i].created_at.substring(0, 19) + tweetsData[i].created_at.substring(25, tweetsData[i].text.length);
                        tweetTime = tweetTime.substring(0, 11) + tweetTime.substring(20, tweetTime.length) + tweetTime.substring(10, 16);

                        tweets[i] = {
                            created_at: tweetTime,
                            caption: tweetCaption,
                            likes: tweetsData[i].favorite_count,
                            retweets: tweetsData[i].retweet_count,
                            id: tweetsData[i].id_str
                        }

                        if (tweetCaption.substring(0, 2) == "RT") {
                            tweets[i].is_retweet = true;
                            tweets[i].caption = tweetCaption.substring(3, tweetsData[i].text.length);
                        }
                    }
                }, function(err) {
                    console.log("failed to retrieve tweets for user");
                });

                // $scope.status = tweets[0];

                return tweets;
            }

            // Twitter API

            var parseTweets = function(data) {
                var tweetsData = data.statuses;

                $scope.tweets = [];

                for (var i = 0; i < tweetsData.length; ++i)
                {
                    var tweetCaption = "";
                    const httpsSubstring = tweetsData[i].text.substring(tweetsData[i].text.length - 23, tweetsData[i].text.length - 18);

                    if (httpsSubstring == 'https') {
                        tweetCaption = tweetsData[i].text.substring(0,tweetsData[i].text.length - 23);
                    }
                    else {
                        tweetCaption = tweetsData[i].text;
                    }

                    $scope.tweets[i] = {
                        user: tweetsData[i].user.name,
                        screen_name: tweetsData[i].user.screen_name,
                        caption: tweetCaption,
                        likes: tweetsData[i].favorite_count,
                        retweets: tweetsData[i].retweet_count,
                        id: tweetsData[i].id_str
                    }

                    if (tweetCaption.substring(0, 2) == "RT") {
                        $scope.tweets[i].is_retweet = true;
                        $scope.tweets[i].caption = tweetCaption.substring(3, tweetsData[i].text.length);
                    }
                }

            }

            var parseTrends = function(data) {
                var trendsData = data[0].trends;

                $scope.trends = [];

                for (var i = 0; i < trendsData.length; ++i)
                {
                    $scope.trends[i] = {
                        name: trendsData[i].name,
                        volume: trendsData[i].tweet_volume
                    }
                }

                if ($scope.trendFilter == "most") {
                    $scope.trends.sort(function(a, b) {
                        return parseInt(b.volume || 0) - parseInt(a.volume || 0);
                    });

                    $scope.maxVolume = $scope.trends[0].volume;
                }
                else if ($scope.trendFilter == "least") {
                    $scope.trends.sort(function(a, b) {
                        return parseInt(a.volume || 0) - parseInt(b.volume || 0);
                    });

                    $scope.maxVolume = $scope.trends[$scope.trends.length - 1].volume;
                }
            }

            var parseUsers = function(data) {
                var usersData = data;

                $scope.users = [];

                $scope.display = "false";

                for(var i = 0; i < usersData.length; i++) {
                    $scope.users[i] = {
                        name: usersData[i].name,
                        screen_name: usersData[i].screen_name,
                        description: usersData[i].description,
                        followers_count: usersData[i].followers_count,
                        statuses_count: usersData[i].statuses_count,
                        display: false,
                        tweets: []
                    }

                    $scope.users[i].tweets = getUserTweets($scope.users[i]);
                }
            }

            $scope.search = function() {

                $scope.status = "Search called.";

                if ($scope.searchType == "Topic") {
                    if ($scope.searchValue == "") {
                        $scope.searchValue = "University of Florida";
                    }
                    const request = {
                        q: $scope.searchValue,
                        result_type: $scope.tweetFilter,
                        count: $scope.tweetDisplayCount
                    }
                    twitterService.searchTweets(request).then(function(res) {

                        $scope.status = "Search finished with " + res.data.statuses.length + " results.";

                        parseTweets(res.data);
                        $scope.currentSearch = $scope.searchValue;
                    }, function(err) {
                        // Handle error
                    })
                }

                if ($scope.searchType == "Location") {
                    if ($scope.searchValue == "") {
                        $scope.searchValue = "Worldwide";
                    }

                    const request = {
                        name: $scope.searchValue
                    }

                    twitterService.searchTrends(request).then(function(res) {

                        $scope.status = "Search finished with " + res.data[0].trends.length + " results.";

                        parseTrends(res.data);
                        $scope.currentSearch = $scope.searchValue;
                    }, function(err) {

                        $scope.status = "Search failed.";

                        $scope.currentSearch = $scope.searchValue;
                        $scope.trends = [];
                    })
                }

                if ($scope.searchType == "User") {
                    if ($scope.searchValue == "") {
                        $scope.searchValue = "Worldwide";
                    }

                    const request = {
                        name: $scope.searchValue
                    }

                    twitterService.searchUsers(request).then(function(res) {

                        $scope.status = "Search finished with " + res.data.length + " results.";

                        parseUsers(res.data);
                        $scope.currentSearch = $scope.searchValue;
                    }, function(err) {

                        $scope.status = "Search failed.";

                        $scope.currentSearch = $scope.searchValue;
                        $scope.users = [];
                    })
                }

            }

            $scope.selectTopic = function(topic) {
                $scope.searchValue = topic;
                $scope.searchType = "Topic";
                $scope.search();
            }

            $scope.selectUser = function(user) {
                $scope.searchValue = user;
                $scope.searchType = "User";
                $scope.search();
            }

            // Geolocation

            $scope.locationList = [];

            var parseLocations = function(data) {
                var locations = data;

                $scope.locationList = [];

                for (var i = 0; i < locations.length; ++i)
                {
                    $scope.locationList[i] = locations[i].name;
                }
            }

            $scope.filterLocations = function() {
                if ($scope.searchType == 'Location') {
                    if ($scope.searchValue == "") {

                        geolocationService.getAll().then(function(res) {
                            parseLocations(res.data);
                        }, function(err) {
                            // Handle error
                        })

                    }
                    else {

                        const request = {
                            token: $scope.searchValue
                        }

                        geolocationService.matchWith(request).then(function(res) {
                            parseLocations(res.data);

                            // $("#tester").text($scope.locationList);
                            // $("#tester").text("Hello");
                        }, function(err) {
                            // Handle error
                        })

                    }
                }
            }

            // Other functionality

            $scope.reset = function() {
                $scope.searchType = "Topic";
                $scope.searchValue = "";
                $scope.search();
            }

            $scope.logout = function() {
                authService.logout().then(function(res) {
                    $location.path("/");
                }, function(err) {
                    $scope.message = "Could not log user out!";
                })
            }

            /* --- Initialization --- */

            // Default search
            $scope.reset();
        }
    ]);