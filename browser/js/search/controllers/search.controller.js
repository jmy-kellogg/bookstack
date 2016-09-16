app.controller('SearchCtl', function($scope, $stateParams, BookFactory){
	$scope.searchTerm = $stateParams.result.toLowerCase();

	BookFactory.getAll()
	.then(function(books){
		var filteredBooks = books.filter(function(book){ 
			if(book.title.toLowerCase().indexOf($scope.searchTerm) !== -1 ||
					book.authors[0].full_name.toLowerCase().indexOf($scope.searchTerm) !== -1
				){
				return books
			}
		})
		$scope.books = filteredBooks;
	})

})