'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Publisher = require('../../db').model('publisher');

router.get('/all', function(req, res, next) {
	// get all publishers

	Publisher.findAll()
	.then(function(publishers) {
		res.json(publishers);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	// add publisher

	var publisherInfo = req.body.publisher;

	Publisher.create(publisherInfo)
	.then(function(publisher) {
		res.json(publisher);
	})
	.catch(next);
});

router.put('/edit/:publisherId', function(req, res, next) {
	// edit publisher info

	var publisherInfo = req.body.publisher;

	Publisher.findById(req.params.publisherId)
	.then(function(publisher) {
		Object.assign(publisher, publisherInfo);
		return publisher.save();
	})
	.then(function(publisher) {
		res.json(publisher);
	})
	.catch(next);
});

router.delete('/:publisherId', function(req, res, next) {
	//delete publisher

	Publisher.findById(req.params.publisherId)
	.then(function(publisher) {
		return publisher.destroy();
	})
	.then(function(){
		res.send();
	})
	.catch(next);
});
