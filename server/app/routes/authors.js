'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.get('/all', function(req, res, next) {
	Author.findAll()
	.then(function(authors) {
		res.json(authors);
	})
	.catch(next);
});



