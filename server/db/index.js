'use strict';
var db = require('./_db');
module.exports = db;


var User = require('./models/user');
var Author = require('./models/author');
var Address = require('./models/address');
var Review = require('./models/review'); // will be a join table with User and Book
var Publisher = require('./models/publisher');
var Book_Type = require('.models/book_type');
var Book = require('./models/book');
var LineItem = require('.models/lineitem'); // will be join table between User and Book_Type, with association to Invoice
var User_Address = require('./models/user_address'); //will be join table between User and Address


// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)


