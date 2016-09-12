'use strict';
var db = require('./_db');
module.exports = db;

// eslint-disable-next-line no-unused-vars
var User = require('./models/user');

var Books = require('./models/book');
var Address = require('./models/address');
var Publisher = require('./models/publisher');


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)


