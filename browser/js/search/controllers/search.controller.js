app.controller('SearchCtl', function($scope, $stateParams, BookFactory){
	$scope.searchTerm = $stateParams.result.toLowerCase();

	BookFactory.getAll()
	.then(function(books){ 
		var filteredBooks = books.filter(function(book){
			if (book.title.toLowerCase().indexOf($scope.searchTerm) !== -1 ||
					book.authors[0].full_name.toLowerCase().indexOf($scope.searchTerm) !== -1
				){
				return book
			}
		});
		$scope.books = filteredBooks;
		$scope.$on('genreCheckBox', function(event, allGenre){
			if(allGenre.All){
				$scope.books= filteredBooks
			}
			else{
			var filteredByGenre = filteredBooks.filter(function(book){
				var genre = book.genre
				if(book.genre === "Non-fiction"){
					genre = "Nonfiction"
				}else if(book.genre === "Romance novel"){
					genre = "Romance"
				}else if(book.genre === "Realistic fiction"){
					console.log(book.genre) 
					genre = "Realistic"
				}
				if(allGenre[genre]){
					return book
				}
			});
			$scope.books = filteredByGenre
			}
		})
	})


});
