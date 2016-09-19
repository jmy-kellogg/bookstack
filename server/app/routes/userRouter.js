'use strict';

var Promise = require('bluebird');
var router = require('express').Router();
module.exports = router;
const db = require('../../db');
const User = db.model('user');
const Address = db.model('address');
const PaymentMethod = db.model('payment_method');

router.get('/', function(req, res, next) {
    User.findAll({
            include: [Address, PaymentMethod] //, Book_Type, Book
        })
        .then(users => res.json(users))
        .catch(next)
})

router.get('/:userId', function(req, res, next) {
    User.findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(user => res.json(user))
        .catch(next)
})

router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(user) {
            res.json(user)
        })
        .catch(next)
})

router.put('/:userId', function(req, res, next) {
    User.findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(user => user.update(req.body))
        .then(_user => res.json(_user))
        .catch(next)
})
router.delete('/:userId', function(req, res, next) {
    User.findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(user => user.destroy())
        .then(() => res.sendStatus(204))
        .catch(next)
})
