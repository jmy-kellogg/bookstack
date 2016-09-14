app.factory('BookFactory', function($http, $log){

	var bookObj = {};

	var getData = function(res) {
		return res.data;
	};

	bookObj.getAll = function(){
		return $http.get('/api/books/all')
			.then(getData)
			.catch($log);
	};

	bookObj.getOne = function(bookId){
		return $http.get('/api/books/single/' + bookId)
			.then(getData)
			.catch($log);
	};

	bookObj.addBook = function(book, authors, publisher){
		return $http.post('/api/books/book', {book, authors, publisher})
			.then(getData)
			.catch($log);
	};

	bookObj.editBook = function(book){
		return $http.put('/api/books/edit/' + book.id, {book})
			.then(getData)
			.catch($log);
	};

	bookObj.addAuthorToBook = function(bookId, author){
		return $http.post('/api/books/book/' + bookId + '/addAuthor', {author})
			.then(getData)
			.catch($log);
	};

	bookObj.removeAuthorFromBook = function(bookId, authorId){
		return $http.delete('/api/books/book/' + bookId + '/removeAuthor/' + authorId)
			.then(getData)
			.catch($log);
	};

	bookObj.changeBookPublisher = function(bookId, publisherId){
		return $http.put('/api/books/book/' + bookId + '/changePublisher/' + publisherId)
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
