'use strict';
var db = require('./_db');
module.exports = db;


var User = require('./models/user');
var Author = require('./models/author');
var Address = require('./models/address');
var Book_Type = require('.models/book_type');
var Book = require('./models/book');
var LineItem = require('.models/lineitem'); // will be join table between User and Book_Type, with association to Invoice

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)


