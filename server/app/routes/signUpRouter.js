'use strict';

var Promise = require('bluebird');
var router = require('express').Router();
module.exports = router;
const db = require('../../db');
const User = db.model('user');

router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(user) {
            res.json(user)
        })
        .catch(next)
})