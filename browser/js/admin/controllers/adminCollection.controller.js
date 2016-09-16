app.controller('AdminCollectionCtrl', function($scope, CollectionFactory, BookFactory){

	$scope.action = 'add';

	$scope.pullData = function(){
		CollectionFactory.getAll()
		.then(function(collections){
			$scope.allCollections = collections;
		})

		BookFactory.getAll()
		.then(function(books){
			$scope.allBooks = books;
		})

	};
	$scope.pullData();

	$scope.add = function(){
		CollectionFactory.addCollection($scope.addCollection)
		.then(function(){
			$scope.pullData();
		});
		$scope.clearAdd();
	};

	$scope.clearAdd = function(){
		$scope.addCollection = {};
	};

	$scope.resetEditForm = function(){
		$scope.editCollection = {};
		$scope.selectedCollectionEdit = '';
	};

	$scope.resetDeleteForm = function(){
		$scope.deleteCollection = {};
		$scope.selectedCollectionDelete = '';
	};

	$scope.selectCollectionEdit = function(){
		if (typeof $scope.selectedCollectionEdit === 'object') {
			$scope.editCollection = $scope.selectedCollectionEdit;
		}
	};

	$scope.saveChanges = function(){
		if (typeof $scope.selectedCollectionEdit !== 'object') {
			$scope.needCollectionForEdit = true;
		} else {
			CollectionFactory.editCollection($scope.selectedCollectionEdit)
			.then(function(){
				$scope.pullData();
			})
			$scope.resetEditForm();
			$scope.needCollectionForEdit = false;
		}
	};

	$scope.selectCollectionDelete = function(){
		if (typeof $scope.selectedCollectionDelete === 'object') {
			$scope.deleteCollection = $scope.selectedCollectionDelete;
		}
	};

	$scope.delete = function(){
		CollectionFactory.deleteCollection($scope.deleteCollection.id);
		$scope.resetDeleteForm();
	};

	$scope.addBook = function(){
		if (typeof $scope.editCollection !== 'object') {
			$scope.needCollection = true;
			$scope.invalidBook = false;
		} else if (typeof $scope.selectedBook === 'object') {
			$scope.editCollection.books.push($scope.selectedBook);
			CollectionFactory.addBookToCollection($scope.editCollection.id, $scope.selectedBook.id);
			$scope.selectedBook = '';
			$scope.invalidBook = false;
			$scope.needCollection = false;
		} else {
			$scope.invalidBook = true;
			$scope.needCollection = false;
		}
	};

	$scope.removeBook = function(bookId){
		CollectionFactory.removeBookFromCollection($scope.editCollection.id, bookId);
		$scope.editCollection.books = $scope.editCollection.books.filter(function(book) {
			return book.id !== bookId;
		});
	};

});
