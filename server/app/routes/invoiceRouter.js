'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Invoice = require('../../db').model('invoice');
var UserPayment = require('../../db').model('user_payment');
var LineItem = require('../../db').model('line_item');
var BookType = require('../../db').model('book_type');
var Book = require('../../db').model('book');
var User = require('../../db').model('user');

router.get('/:invoiceId', function(req, res, next) {

	User.findOne({
		where: {
			id: req.user.id,
		},
		include: [
			{model: BookType, include: [Book]}
		]
	})
	.then(function(user){
		console.log(user.book_types)
		var cartItems = user.book_types.filter(function(instance){
			console.log(instance.line_item.invoiceId)
			return instance.line_item.invoiceId === +req.params.invoiceId
		})
		return Invoice.findById(+req.params.invoiceId)
		.then(function(invoice) {
			res.json({invoice, cartItems})
		})
	})
	.catch(next);
})

router.post('/', function(req, res, next) {
	// create new invoice

	var payment = req.body.payment;
	var total = req.body.total;
	var comment = req.body.comment;

	Invoice.create({total, comment})
	.then(function(invoice) {
		return UserPayment.findOne({where: {userId: req.user.id, paymentMethodId: payment.id}})
		.then(function(userPayment) {
			return invoice.setUser_payment(userPayment);
		})
		.then(function(){
			res.json(invoice);
		})
	})


});
