app.factory('AuthorFactory', function($http, $log){

	var authorObj = {};

	var getData = function(res) {
		return res.data;
	};

	authorObj.getAll = function(){
		return $http.get('/api/authors/')
			.then(getData)
			.catch($log);
	};

	authorObj.addAuthor = function(author){
		return $http.post('/api/authors/', author)
			.then(getData)
			.catch($log);
	};

	authorObj.editAuthor = function(author){
		return $http.put('/api/authors/' + author.id, author)
			.then(getData)
			.catch($log);
	};

	authorObj.deleteAuthor = function(authorId){
		//console.log(authorId)
		return $http.delete('/api/authors/' + authorId)
			.then(getData)
			.catch($log);
	};

	authorObj.formatName = function(author){
		var name = [];
		if (author.first_name) {
			name.push(author.first_name);
		}
		if (author.middle_initial) {
			name.push(author.middle_initial);
		}
		if (author.last_name) {
			name.push(author.last_name);
		}
		return name.join(' ');
	};

	return authorObj;

});

