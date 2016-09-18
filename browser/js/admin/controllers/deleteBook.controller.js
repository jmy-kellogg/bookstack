app.controller('DeleteBookCtrl', function($scope, BookFactory) {

	$scope.pullData = function(){
		BookFactory.getAll()
		.then(function(books){
			$scope.allBooks = books;
		})
	};

	$scope.resetForm = function(){
		$scope.book = {};
		$scope.selectedBook = '';
		$scope.pullData();
	};
	$scope.resetForm();

	$scope.selectBook = function(){
		if (typeof $scope.selectedBook === 'object') {
			$scope.book = $scope.selectedBook;
		}
	};

	$scope.deleteBook = function(){
		if ($scope.book.title) {
			BookFactory.deleteBook($scope.book.id);
			$scope.resetForm();
		}
	};

});
