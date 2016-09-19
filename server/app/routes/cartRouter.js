'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Promise = require('bluebird');
var User = require('../../db').model('user');
var BookType = require('../../db').model('book_type');
var LineItem = require('../../db').model('line_item');
var Invoice = require('../../db').model('invoice');

router.get('/', function(req, res, next) {
	// get current user's cart
	if (req.user) {
		LineItem.findAll({
			where: {
				userId: req.user.id,
				status: 'cart'
			},
			include: [User, BookType]
		})
		.then(function(cartItems){
			res.json(cartItems);
		})
		.catch(next);
	}

});

router.post('/', function(req, res, next) {
	// add item to current user's cart

	var bookItem = req.body;

	if (req.user) {
		req.user.addBook_type(bookItem, {status: 'cart', quantity: 1, unit_price: bookItem.price})
		.then(function(data) {
			res.json(data);
		})
		.catch(next);
	}
});

router.delete('/:booktype', function(req, res, next) {
	// remove item from current user's cart

	if (req.user) {
		req.user.removeBook_type(req.body)
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

	cartItems = cartItems.map(function(item){
		item.invoiceId = invoice.id;
		item.status = 'purchased';
		return item.save();
	})

	Promise.all(cartItems)
	.then(function(data){
		res.json(data);
	})
	.catch(next);


});
