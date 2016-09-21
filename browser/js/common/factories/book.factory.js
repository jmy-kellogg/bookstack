app.factory('BookFactory', function($http, $log, AuthorFactory, PublisherFactory){

	var bookObj = {};

	var getData = function(res) {
		return res.data;
	};

	bookObj.getAll = function(){
		return $http.get('/api/books/')
			.then(getData)
			.catch($log);
	};

	bookObj.getOne = function(bookId){
		return $http.get('/api/books/' + bookId)
			.then(getData)
			.catch($log);
	};

	bookObj.addBook = function(book, authors, publisher){
		var createdBook;
		return $http.post('/api/books/book', {book})
			.then(getData)
			.then(function(_book) {
				createdBook = _book;
				var promisesForAuthors = authors.map(function(author){
					return AuthorFactory.addAuthor(author)
						.then(function(_author) {
							return bookObj.addAuthorToBook(_book.id, _author.id);
						});
				});
				return Promise.all(promisesForAuthors);
			})
			.then(function(){
				return PublisherFactory.addPublisher(publisher)
					.then(function(_publisher) {
						return bookObj.changeBookPublisher(createdBook.id, _publisher.id);
					})
			})
			.then(function(){
				return createdBook;
			})
			.catch($log);
	};

	bookObj.editBook = function(book){
		return $http.put('/api/books/' + book.id, {book})
			.then(getData)
			.catch($log);
	};

	bookObj.addAuthorToBook = function(bookId, authorId){
		return $http.post('/api/books/' + bookId + '/author/' + authorId)
			.then(getData)
			.catch($log);
	};

	bookObj.removeAuthorFromBook = function(bookId, authorId){
		return $http.delete('/api/books/' + bookId + '/author/' + authorId)
			.then(getData)
			.catch($log);
	};

	bookObj.changeBookPublisher = function(bookId, publisherId){
		return $http.put('/api/books/' + bookId + '/publisher/' + publisherId)
			.then(getData)
			.catch($log);
	};

	bookObj.addReview = function(bookId, review){
		return $http.post('/api/books/' + bookId + '/review', review)
			.then(getData)
			.catch($log);
	};

	bookObj.deleteBook = function(bookId){
		return $http.delete('/api/books/' + bookId)
			.then(getData)
			.catch($log);
	};


	return bookObj;

});
