angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.loadList = function() {
      /* Get all the listings, then bind it to the scope */
      Listings.getAll().then(function(response) {
        $scope.listings = response.data;
      }, function(error) {
        console.log('Unable to retrieve listings:', error);
      });
    };

    $scope.addListing = function() {
      Listings.create($scope.newListing).then(function(response) {
        $scope.loadList();
      }, function(error) {
        console.log('Unable to add listing:', error);
      });
    };

    $scope.deleteListing = function(id) {
      console.log('Test');
      Listings.delete(id).then(function(response) {
        $scope.loadList();
      }, function(error) {
        console.log('Unable to remove listing:', error);
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    // Initialization
    $scope.loadList();
    $scope.detailedInfo = undefined;
  }
]);