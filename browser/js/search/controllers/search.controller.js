app.controller('SearchCtl', function($scope, $stateParams, BookFactory){
	$scope.searchTerm = $stateParams.result;

	BookFactory.getAll()
	.then(function(books){
		var filteredBooks = books.filter(function(book){ if(book.title.indexOf($scope.searchTerm) !== -1){
				return books
			}
		})
		$scope.books = filteredBooks;
	})

})