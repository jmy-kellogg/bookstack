'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Author = require('../../db').model('author');

router.param('authorId', function(req, res, next, id) {
	Author.findOne({
		where: {
			id: id
		}
	})
	.then(function(author) {
		if (author) {
			req.author = author;
		} else {
			res.sendStatus(404);
		}
		next();
	})
	.catch(next);
})

router.get('/', function(req, res, next) {
	// get all authors

	Author.findAll()
	.then(function(authors) {
		res.json(authors);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	// add author

	Author.findOrCreate({where: req.body})
	.spread(function(author) {
		res.json(author);
	})
	.catch(next);
});

router.put('/:authorId', function(req, res, next) {
	// edit author info

	Object.assign(req.author, req.body);
	req.author.save()
	.then(function(author) {
		res.json(author);
	})
	.catch(next);
});

router.delete('/:authorId', function(req, res, next) {
	//delete author

	req.author.destroy()
	.then(function(){
		res.sendStatus(204);
	})
	.catch(next);
});
