app.factory('PublisherFactory', function($http, $log){

	var publisherObj = {};

	var getData = function(res) {
		return res.data;
	};

	publisherObj.getAll = function(){
		return $http.get('/api/publishers/')
			.then(getData)
			.catch($log);
	};

	publisherObj.addPublisher = function(publisher){
		return $http.post('/api/publishers/', publisher)
			.then(getData)
			.catch($log);
	};

	publisherObj.editPublisher = function(publisher){
		return $http.put('/api/publishers/' + publisher.id, publisher)
			.then(getData)
			.catch($log);
	};

	publisherObj.deletePublisher = function(publisherId){
		return $http.delete('/api/publishers/' + publisherId)
			.then(getData)
			.catch($log);
	};

	return publisherObj;

});

