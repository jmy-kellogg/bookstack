'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var PaymentMethod = require('../../db').model('payment_method');
var stripe = require('stripe')('sk_test_0g9e7QcJ86HMFoBEZlcsvyeo');


router.post('/', function(req, res, next) {
	// find or create new payment method

	var token = req.body.stripeToken;
	var lastFour = req.body.lastFour;
	var total = Math.round(req.body.total * 100);

	// Create a charge: this will charge the user's card
	var charge = stripe.charges.create({
	  amount: total, // Amount in cents
	  currency: 'usd',
	  source: token,
	  description: 'Example charge'
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	    console.log('card declined!!!!!')
	  } else {
		console.log('success!!!!!!!!!!!!')
	  }
	});

	PaymentMethod.findOrCreate({where: {token, lastFour}})
	.spread(function(payment, created) {
		if (created) {
			req.user.addPayment_method(payment);
		}
		res.json(payment);
	})

});
