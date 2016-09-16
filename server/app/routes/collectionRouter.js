'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Collection = require('../../db').model('collection');
var Book = require('../../db').model('book');
var Author = require('../../db').model('author');
var Book_Collection = require('../../db').model('book_collection');

router.param('collectionId', function(req, res, next, id) {
	Collection.findOne({
		where: {
			id: id
		},
		include: [Book, Author]
	})
	.then(function(collection) {
		if (collection) {
			req.collection = collection;
		} else {
			res.sendStatus(404);
		}
		next();
	})
	.catch(next);
})


router.get('/', function(req, res, next) {
	// get all collections

	Collection.findAll()
	.then(function(collections) {
		res.json(collections);
	})
	.catch(next);
});

router.get('/:collectionId', function(req, res, next) {
	// get single collection

	res.json(req.collection);

});

router.post('/', function(req, res, next) {
	// add collection

	Collection.create(req.body)
	.then(function(collection) {
		res.json(collection);
	})
	.catch(next);
});

router.post('/:collectionId/book/:bookId', function(req, res, next) {
	// add book to collection

	Book.findById(req.params.bookId)
	.then(function(book) {
		return req.collection.addBook(book);
	})
	.then(function(data) {
		res.json(data);
	})
	.catch(next);

});

router.put('/:collectionId', function(req, res, next) {
	// edit collection info

	Object.assign(req.collection, req.body);
	req.collection.save()
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
	.then(function(data){
		res.send(data);
	})
	.catch(next);

});

router.delete('/:collectionId/removeBook/:bookId', function(req, res, next) {
	// remove book from collection

	Book.findById(req.params.bookId)
	.then(function(book) {
		return req.collection.removeBook(book);
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
		res.sendStatus(204);
	})
	.catch(next);
});

router.delete('/:collectionId', function(req, res, next) {
	//delete collection

	req.collection.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});

