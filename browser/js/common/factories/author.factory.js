app.factory('AuthorFactory', function($http, $log){

	var authorObj = {};

	var getData = function(res) {
		return res.data;
	};

	authorObj.getAll = function(){
		return $http.get('/api/authors/all')
			.then(getData)
			.catch($log);
	};

	authorObj.addAuthor = function(author){
		return $http.post('/api/authors/', {author})
			.then(getData)
			.catch($log);
	};

	authorObj.editAuthor = function(author){
		return $http.put('/api/authors/edit/' + author.id, {author})
			.then(getData)
			.catch($log);
	};

	authorObj.deleteAuthor = function(authorId){
		return $http.delete('/api/authors/' + authorId)
			.then(getData)
			.catch($log);
	};

	return authorObj;

});

