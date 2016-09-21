'use strict'

app.controller('FilterCtl', function($scope, BookFactory, $state) {
	$scope.getGenre = {All: true};
    $scope.getGenreResult = function(isAll) {
    	if(isAll){
    		$scope.getGenre = {All: true}
    	}else{
    		$scope.getGenre.All = false
    	}
    	$scope.$emit('genreCheckBox', $scope.getGenre)
    }
})
