'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Author = require('../../db').model('author');

router.get('/all', function(req, res, next) {
	// get all authors

	Author.findAll()
	.then(function(authors) {
		res.json(authors);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	// add author

	var authorInfo = req.body.author;

	Author.create(authorInfo)
	.then(function(author) {
		res.json(author);
	})
	.catch(next);
});

router.put('/edit/:authorId', function(req, res, next) {
	// edit author info

	var authorInfo = req.body.author;

	Author.findById(req.params.authorId)
	.then(function(author) {
		Object.assign(author, authorInfo);
		return author.save();
	})
	.then(function(author) {
		res.json(author);
	})
	.catch(next);
});

router.delete('/:authorId', function(req, res, next) {
	//delete author

	Author.findById(req.params.authorId)
	.then(function(author) {
		return author.destroy();
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});
