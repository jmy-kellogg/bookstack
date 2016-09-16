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

router.param('bookId', function(req, res, next, id) {
	Book.findOne({
		where: {
			id: id
		},
		include: [Author, Publisher, Collection, Book_Type, Review]
	})
	.then(function(book) {
		if (book) {
			req.book = book;
		} else {
			res.sendStatus(404);
		}
		next();
	})
	.catch(next);
})

router.get('/', function(req, res, next) {
	// route to get all books (meant to be fodder for searching and search result page)
	Book.findAll({
		include: [Author, Publisher, Collection, Book_Type],
		order: [['book_score', 'DESC']]
	})
	.then(function(books) {
		res.json(books);
	})
	.catch(next);

});

router.get('/:bookId', function(req, res, next) {
	//route to get all info for a single book by book id, meant for single book state
	res.json(req.book);

});

// above this line requires no authentication; below this line requires admin access

router.post('/book', function(req, res, next) {
	//add book (with option to add new author(s) and publisher)
	var bookInfo = req.body.book;

	Book.create(bookInfo)
	.then(function(book){
		res.json(book);
	})
	.catch(next);

});

router.put('/:bookId', function(req, res, next) {
	// edit book info
	var bookInfo = req.body.book;

	Object.assign(req.book, bookInfo);
	req.book.save()
	.then(function(book) {
		res.json(book);
	})
	.catch(next);
});

router.put('/:bookId/publisher/:publisherId', function(req, res, next) {
	//change publisher of book

	Publisher.findById(req.params.publisherId)
	.then(function(publisher) {
		return req.book.setPublisher(publisher);
	})
	.then(function(data){
		res.json(data);
	})
	.catch(next);
});

router.post('/:bookId/author/:authorId', function(req, res, next) {
	// add author to book

	Author.findById(req.params.authorId)
	.then(function(author) {
		return req.book.addAuthor(author);
	})
	.then(function(data){
		res.json(data);
	})
	.catch(next);

});

router.delete('/:bookId/author/:authorId', function(req, res, next) {
	// remove author from book

	Author.findById(req.params.authorId)
	.then(function(author) {
		return req.book.removeAuthor(author);
	})
	.then(function(data){
		res.json(data);
	})
	.catch(next);
});

router.delete('/:bookId', function(req, res, next) {
	//delete book

	req.book.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
