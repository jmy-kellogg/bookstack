'use strict'

app.controller('FilterCtl', function($scope, BookFactory, $state) {
	$scope.getGenre = {All: true};
    $scope.getGenreResult = function() {
    	$scope.$emit('genreCheckBox', $scope.getGenre)
    }
})
