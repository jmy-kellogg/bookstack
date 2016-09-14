'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Collection = require('../../db').model('collection');
var Book = require('../../db').model('book');
var Author = require('../../db').model('author');
var Book_Collection = require('../../db').model('book_collection');

router.get('/all', function(req, res, next) {
	// get all collections

	Collection.findAll()
	.then(function(collections) {
		res.json(collections);
	})
	.catch(next);
});

router.get('/:collectionId', function(req, res, next) {
	// get single collection

	Collection.findAll({
		include: [Book, Author],
		where: {
			id: req.params.collectionId
		}
	})
	.then(function(collection) {
		res.json(collection);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	// add collection

	var collectionInfo = req.body.collection;

	Collection.create(collectionInfo)
	.then(function(collection) {
		res.json(collection);
	})
	.catch(next);
});

router.post('/:collectionId/addBook/:bookId', function(req, res, next) {
	// add book to collection

	Collection.findById(req.params.collectionId)
	.then(function(collection) {
		return Book.findById(req.params.bookId)
		.then(function(book) {
			return collection.addBook(book);
		})
	})
	.then(function() {
		res.send();
	})
	.catch(next);

});

router.put('/edit/:collectionId', function(req, res, next) {
	// edit collection info

	var collectionInfo = req.body.collection;

	Collection.findById(req.params.collectionId)
	.then(function(collection) {
		Object.assign(collection, collectionInfo);
		return collection.save();
	})
	.then(function(collection) {
		res.json(collection);
	})
	.catch(next);
});

router.put('/:collectionId/reorder', function(req, res, next) {
	// rearrange order of books in collection

	var bookOrder = req.body.bookOrder; //bookOrder is an array of book ids in order of their order in a collection

	var promisesForBookOrdering = bookOrder.map(function(bookId, index) {
		return Book_Collection.findOne({
			where: {
				collectionId: req.params.collectionId,
				bookId: bookId
			}
		})
		.then(function(joinInstance) {
			joinInstance.place_in_series = index + 1;
			return joinInstance.save();
		});
	});

	Promise.all(promisesForBookOrdering)
	.then(function(){
		res.send();
	})
	.catch(next);

});

router.delete('/:collectionId/removeBook/:bookId', function(req, res, next) {
	// remove book from collection

	Collection.findById(req.params.collectionId)
	.then(function(collection) {
		return Book.findById(req.params.bookId)
			.then(function(book) {
				return collection.removeBook(book);
			});
	})
	.then(function() {
		return Book_Collection.findAll({
			where: {collectionId: req.params.collectionId}
		});
	})
	.then(function(joinInstances) {
		var promises = joinInstances.map(function(instance, index) {
			instance.place_in_series = index + 1;
			return instance.save();
		});
		return Promise.all(promises);
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});

router.delete('/:collectionId', function(req, res, next) {
	//delete collection

	Collection.findById(req.params.collectionId)
	.then(function(collection) {
		return collection.destroy();
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});

