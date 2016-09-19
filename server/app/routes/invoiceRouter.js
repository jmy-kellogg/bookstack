'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var Invoice = require('../../db').model('invoice');
var UserPayment = require('../../db').model('user_payment');

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
