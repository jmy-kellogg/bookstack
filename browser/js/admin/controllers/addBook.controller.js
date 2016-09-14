app.controller('AddBookCtrl', function($scope, BookFactory) {
	$scope.resetForm = function(){
		$scope.book = {};
		$scope.author = {};
		$scope.publisher = {};
		$scope.authors = [];
	};
	$scope.resetForm();

	$scope.addAuthor = function(){
		$scope.authors.push($scope.author);
		$scope.author = {};
	};

	$scope.addBook = function(){
		BookFactory.addBook($scope.book, $scope.authors, $scope.publisher)
		$scope.resetForm();
	};

});

