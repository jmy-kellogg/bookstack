'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Publisher = require('../../db').model('publisher');

router.param('publisherId', function(req, res, next, id) {
	Publisher.findOne({
		where: {
			id: id
		}
	})
	.then(function(publisher) {
		if (publisher) {
			req.publisher = publisher;
		} else {
			res.sendStatus(404);
		}
		next();
	})
	.catch(next);
})


router.get('/', function(req, res, next) {
	// get all publishers

	Publisher.findAll()
	.then(function(publishers) {
		res.json(publishers);
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	// add publisher

	Publisher.findOrCreate({where: req.body})
	.spread(function(publisher) {
		res.json(publisher);
	})
	.catch(next);
});

router.put('/:publisherId', function(req, res, next) {
	// edit publisher info

	Object.assign(req.publisher, req.body);
	req.publisher.save()
	.then(function(publisher) {
		res.json(publisher);
	})
	.catch(next);
});

router.delete('/:publisherId', function(req, res, next) {
	//delete publisher

	req.publisher.destroy()
	.then(function(){
		res.send();
	})
	.catch(next);
});
