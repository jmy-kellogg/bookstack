app.controller('AdminPublisherCtrl', function($scope, PublisherFactory){

	$scope.action = 'add';

	$scope.pullData = function(){
		PublisherFactory.getAll()
		.then(function(publishers){
			publishers = publishers.map(function(publisher) {
				publisher.fullName = $scope.formatName(publisher);
				return publisher;
			})
			$scope.allPublishers = publishers;
		})

	};
	$scope.pullData();

	$scope.add = function(){
		PublisherFactory.addPublisher($scope.addPublisher)
		.then(function(){
			$scope.pullData();
		});
		$scope.clearAdd();
	};

	$scope.clearAdd = function(){
		$scope.addPublisher = {};
	};

	$scope.resetEditForm = function(){
		$scope.editPublisher = {};
		$scope.selectedPublisherEdit = '';
	};

	$scope.resetDeleteForm = function(){
		$scope.deletePublisher = {};
		$scope.selectedPublisherDelete = '';
	};

	$scope.selectPublisherEdit = function(){
		if (typeof $scope.selectedPublisherEdit === 'object') {
			$scope.editPublisher = $scope.selectedPublisherEdit;
			delete $scope.editPublisher.fullName;
		}
	};

	$scope.saveChanges = function(){
		if (typeof $scope.selectedPublisherEdit !== 'object') {
			$scope.needPublisherForEdit = true;
		} else {
			PublisherFactory.editPublisher($scope.selectedPublisherEdit)
			.then(function(){
				$scope.pullData();
			})
			$scope.resetEditForm();
			$scope.needPublisherForEdit = false;
		}
	};

	$scope.selectPublisherDelete = function(){
		console.log($scope.selectedPublisherDelete)
		if (typeof $scope.selectedPublisherDelete === 'object') {
			$scope.deletePublisher = $scope.selectedPublisherDelete;
		}
	};

	$scope.delete = function(){
		PublisherFactory.deletePublisher($scope.deletePublisher.id);
		$scope.resetDeleteForm();
	};

	$scope.formatName = PublisherFactory.formatName;

});

