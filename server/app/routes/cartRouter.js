'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Promise = require('bluebird');
var User = require('../../db').model('user');
var BookType = require('../../db').model('book_type');
var LineItem = require('../../db').model('line_item');
var Book = require('../../db').model('book');

router.use(function(req, res, next) {
	if (!req.user) {
		User.findById(2)
		.then(function(user) {
			req.user = user;
		})
	}
	next()
})

router.get('/', function(req, res, next) {
	// get current user's cart
	if (req.user) {
		User.findOne({
			where: {
				id: req.user.id,
			},
			include: [
				{model: BookType, include: [Book]}
			]
		})
		.then(function(user){
			var cartItems = user.book_types.filter(function(instance){
				return instance.line_item.status === 'cart'
			})
			res.json(cartItems);
		})
		.catch(next);
	}

});

router.post('/', function(req, res, next) {
	// add item to current user's cart

	var bookItem = req.body;
	console.log(bookItem)
	if (req.user) {
		console.log('hello')
		LineItem.create({userId: req.user.id, bookTypeId: bookItem.id, status: 'cart', quantity: 1, unit_price: bookItem.price})
		//req.user.addBook_type(bookItem, {status: 'cart', quantity: 1, unit_price: bookItem.price})
		.then(function(data) {
			res.json(data);
		})
		.catch(next);
	}
});

router.delete('/:booktypeId', function(req, res, next) {
	// remove item from current user's cart

	if (req.user) {
		req.user.removeBook_type(req.params.booktypeId)
		.then(function(data) {
			res.json(data);
		})
		.catch(next);
	}
});

router.put('/', function(req, res, next) {
	// purchase all items in current user's cart

	var invoice = req.body.invoice;
	var cartItems = req.body.cartItems;
	console.log(cartItems)

	LineItem.findAll({
		where: {
			userId: req.user.id,
			status: 'cart'
		}
	})
	.then(function(instances) {
		instances = instances.map(function(instance) {
			instance.invoiceId = invoice.id;
			instance.status = 'purchased';
			return instance.save();
		})
		return Promise.all(instances);
	})
	.then(function(data){
		res.json(data);
	})
	.catch(next);


});
