app.factory('CollectionFactory', function($http, $log){

	var collectionObj = {};

	var getData = function(res) {
		return res.data;
	};

	collectionObj.getAll = function(){
		return $http.get('/api/collections/')
			.then(getData)
			.catch($log);
	};

	collectionObj.getOne = function(collectionId){
		return $http.get('/api/collections/' + collectionId)
			.then(getData)
			.catch($log);
	};

	collectionObj.addCollection = function(collection){
		return $http.post('/api/collections/', collection)
			.then(getData)
			.catch($log);
	};

	collectionObj.addBookToCollection = function(collectionId, bookId){
		return $http.post('/api/collections/' + collectionId + '/book/' + bookId)
			.then(getData)
			.catch($log);
	};

	collectionObj.removeBookFromCollection = function(collectionId, bookId){
		return $http.delete('/api/collections/' + collectionId + '/book/' + bookId)
			.then(getData)
			.catch($log);
	};

	collectionObj.editCollection = function(collection){
		return $http.put('/api/collections/' + collection.id, collection)
			.then(getData)
			.catch($log);
	};

	collectionObj.deleteCollection = function(collectionId){
		return $http.delete('/api/collections/' + collectionId)
			.then(getData)
			.catch($log);
	};

	collectionObj.rearrangeCollection = function(collectionId, bookOrder) {
		return $http.put('/api/collections/' + collectionId + '/reorder', bookOrder)
			.then(getData)
			.catch($log);
	};


	return collectionObj;

});

