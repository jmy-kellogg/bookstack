app.directive('searchBox', function ($state) {
    return {
        restrict: 'E',
        scope: {
        	name: '='
        },
        templateUrl: 'js/common/directives/searchBox/searchBox.html',
        // controller: function($scope, BookFactory){
        // 	BookFactory.getAll()
        // 	.then(function(books){
        // 		$scope.books = books
        // 	})
        // }
    }
});