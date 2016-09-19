'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

router.use('/authors', require('./authorRouter.js'));
router.use('/publishers', require('./publisherRouter.js'));
router.use('/collections', require('./collectionRouter.js'));
router.use('/books', require('./bookRouter.js'));
router.use('/users', require('./userRouter.js'));
router.use('/cart', require('./cartRouter.js'));
router.use('/invoice', require('./invoiceRouter.js'));
router.use('/payment', require('./paymentRouter.js'));

// Make sure this is after all of
// the registered routes!
router.use(function(req, res) {
    res.status(404).end();
});