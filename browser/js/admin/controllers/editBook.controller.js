app.controller('EditBookCtrl', function($scope, BookFactory, AuthorFactory, PublisherFactory) {

	$scope.pullData = function(){
		BookFactory.getAll()
		.then(function(books){
			$scope.allBooks = books;
		})

		AuthorFactory.getAll()
		.then(function(authors){
			authors = authors.map(function(author) {
				author.fullName = $scope.formatName(author);
				return author;
			})
			$scope.allAuthors = authors;
		})

		PublisherFactory.getAll()
		.then(function(publishers){
			$scope.allPublishers = publishers;
		})
	};


	$scope.resetForm = function(){
		$scope.book = {};
		$scope.author = {};
		$scope.publisher = {};
		$scope.selectedBook = '';
		$scope.authors = [];
		$scope.pullData();
	};
	$scope.resetForm();

	$scope.addAuthor = function(){
		if (typeof $scope.selectedBook !== 'object') {
			$scope.needBookForAuth = true;
			$scope.invalidAuthor = false;
		} else if (typeof $scope.selectedAuthor === 'object') {
			$scope.authors.push($scope.selectedAuthor);
			BookFactory.addAuthorToBook($scope.selectedBook.id, $scope.selectedAuthor.id);
			$scope.selectedAuthor = "";
			$scope.invalidAuthor = false;
			$scope.needBook = false;
		} else {
			$scope.invalidAuthor = true;
			$scope.needBook = false;
		}
	};

	$scope.formatName = AuthorFactory.formatName;

	$scope.removeAuthor = function(authorId){
		BookFactory.removeAuthorFromBook($scope.selectedBook.id, authorId);
		$scope.authors = $scope.authors.filter(function(author) {
			return author.id !== authorId;
		});
	};

	$scope.saveChanges = function(){
		BookFactory.editBook($scope.book);
	};

	$scope.changePublisher = function(){
		if (typeof $scope.selectedBook !== 'object') {
			$scope.needBookForPub = true;
			$scope.invalidPublisher = false;
		} else if (typeof $scope.selectedPublisher === 'object') {
			BookFactory.changeBookPublisher($scope.selectedBook.id, $scope.selectedPublisher.id)
			$scope.publisher = $scope.selectedPublisher;
			$scope.selectedPublisher = "";
			$scope.invalidPublisher = false;
			$scope.needBookforPub = false;
		} else {
			$scope.invalidPublisher = true;
			$scope.needBookForPub = false;
		}
		
	};

	$scope.selectBook = function(){
		if (typeof $scope.selectedBook === 'object') {
			$scope.book = $scope.selectedBook;
			$scope.authors = $scope.book.authors;
			$scope.publisher = $scope.book.publisher;
			delete $scope.book.authors;
			delete $scope.book.publisher;
			delete $scope.book.publisherId;
		}
	};

});

