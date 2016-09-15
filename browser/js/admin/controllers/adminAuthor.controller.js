app.controller('AdminAuthorCtrl', function($scope, AuthorFactory){

	$scope.action = 'add';

	$scope.pullData = function(){
		AuthorFactory.getAll()
		.then(function(authors){
			authors = authors.map(function(author) {
				author.fullName = $scope.formatName(author);
				return author;
			})
			$scope.allAuthors = authors;
		})

	};
	$scope.pullData();

	$scope.add = function(){
		AuthorFactory.addAuthor($scope.addAuthor)
		.then(function(){
			$scope.pullData();
		});
		$scope.clearAdd();
	};

	$scope.clearAdd = function(){
		$scope.addAuthor = {};
	};

	$scope.resetEditForm = function(){
		$scope.editAuthor = {};
		$scope.selectedAuthorEdit = '';
	};

	$scope.resetDeleteForm = function(){
		$scope.deleteAuthor = {};
		$scope.selectedAuthorDelete = '';
	};

	$scope.selectAuthorEdit = function(){
		if (typeof $scope.selectedAuthorEdit === 'object') {
			$scope.editAuthor = $scope.selectedAuthorEdit;
			delete $scope.editAuthor.fullName;
		}
	};

	$scope.saveChanges = function(){
		if (typeof $scope.selectedAuthorEdit !== 'object') {
			$scope.needAuthorForEdit = true;
		} else {
			AuthorFactory.editAuthor($scope.selectedAuthorEdit)
			.then(function(){
				$scope.pullData();
			})
			$scope.resetEditForm();
			$scope.needAuthorForEdit = false;
		}
	};

	$scope.selectAuthorDelete = function(){
		console.log($scope.selectedAuthorDelete)
		if (typeof $scope.selectedAuthorDelete === 'object') {
			$scope.deleteAuthor = $scope.selectedAuthorDelete;
		}
	};

	$scope.delete = function(){
		AuthorFactory.deleteAuthor($scope.deleteAuthor.id);
		$scope.resetDeleteForm();
	};

	$scope.formatName = AuthorFactory.formatName;

});

