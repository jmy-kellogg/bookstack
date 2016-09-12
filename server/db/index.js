'use strict';
var db = require('./_db');
module.exports = db;


var User = require('./models/user');
var Author = require('./models/author');
var Address = require('./models/address');
var Book_Type = require('.models/book_type');
var Book = require('./models/book');

// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)


