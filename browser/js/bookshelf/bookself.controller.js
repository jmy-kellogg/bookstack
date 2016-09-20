app.controller('BookshelfCtrl', function($scope, CollectionFactory, BookFactory, $stateParams) {
	CollectionFactory.getAll()
	.then(function(collections){
		$scope.collections = collections;
	})
	function star() {
		console.log(star)
	}
});

