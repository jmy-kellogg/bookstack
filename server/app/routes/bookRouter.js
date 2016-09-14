'use strict';
var Promise = require('bluebird');
var router = require('express').Router();
module.exports = router;
var Book = require('../../db').model('book');
var Author = require('../../db').model('author');
var Publisher = require('../../db').model('publisher');
var Book_Type = require('../../db').model('book_type');
var Collection = require('../../db').model('collection');
var Review = require('../../db').model('review');

router.get('/all', function(req, res, next) {
	// route to get all books (meant to be fodder for searching and search result page)
	Book.findAll({
		include: [Author],
		order: [['book_score', 'DESC']]
	})
	.then(function(books) {
		res.json(books);
	})
	.catch(next);
});

router.get('/single/:bookId', function(req, res, next) {
	//route to get all info for a single book by book id, meant for single book state
	Book.findOne({
		where: {
			id: req.params.bookId
		},
		include: [Author, Publisher, Collection]
	})
	.then(function(book) {
		res.json(book);
	})
	.catch(next);
});

// above this line requires no authentication; below this line requires admin access

router.post('/book', function(req, res, next) {
	//add book (with option to add new author(s) and publisher)
	var bookInfo = req.body.book;
	var authorsInfo = req.body.authors; // array of authors
	var publisherInfo = req.body.publisher;

	Book.create(bookInfo)
	.then(function(book) {
		var promisesForAuthors = authorsInfo.map(function (author) {
			return Author.findOrCreate({where: author});
		});
		return Promise.all(promisesForAuthors)
			.then(function(authors) {
				var promisesForAddAuthors = [];
				authors.forEach(function(author) {
					promisesForAddAuthors.push(book.addAuthor(author[0]));
				})
				return Promise.all(promisesForAddAuthors);
			})
			.then(function(){
				return Publisher.findOrCreate({where: publisherInfo});
			})
			.spread(function(publisher) {
				return book.setPublisher(publisher);
			})

	})
	.then(function(){
		res.send();
	})
	.catch(next);

});

router.put('/edit/:bookId', function(req, res, next) {
	// edit book info
	var bookInfo = req.body.book;
	
	Book.findById(req.params.bookId)
	.then(function(book) {
		Object.assign(book, bookInfo);
		return book.save();
	})
	.then(function(book) {
		res.json(book);
	})
	.catch(next);
});

router.put('/book/:bookId/changePublisher/:publisherId', function(req, res, next) {
	//change publisher of book

	Book.findById(req.params.bookId)
	.then(function(book) {
		return Publisher.findById(req.params.publisherId)
		.then(function(publisher) {
			return book.setPublisher(publisher);
		});
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});

router.post('/book/:bookId/addAuthor', function(req, res, next) {
	// add author to book
	var authorInfo = req.body.author;

	Book.findById(req.params.bookId)
	.then(function(book) {
		return Author.findOrCreate({where: authorInfo})
			.spread(function(author) {
				return book.addAuthor(author);
			});
	})
	.then(function(){
		res.send();
	})
	.catch(next);

});

router.delete('/book/:bookId/removeAuthor/:authorId', function(req, res, next) {
	// remove author from book

	Book.findById(req.params.bookId)
	.then(function(book) {
		return Author.findById(req.params.authorId)
			.then(function(author) {
				return book.removeAuthor(author);
			});
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});

router.delete('/:bookId', function(req, res, next) {
	//delete book

	Book.findById(req.params.bookId)
	.then(function(book) {
		return book.destroy();
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});
