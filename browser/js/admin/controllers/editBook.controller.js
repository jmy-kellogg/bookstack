app.controller('EditBookCtrl', function($scope, BookFactory) {
	// $scope.resetForm = function(){
	// 	$scope.book = {};
	// 	$scope.author = {};
	// 	$scope.publisher = {};
	// 	$scope.authors = [];
	// };

	BookFactory.getAll()
	.then(function(books){
		$scope.books = books;
	})

	$scope.addAuthor = function(){
		$scope.authors.push($scope.author);
		$scope.author = {};
	};

	$scope.removeAuthor = function(){

	};

	$scope.saveChanges = function(){
		BookFactory.editBook($scope.book);
	};

});

