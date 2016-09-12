'use strict';
var db = require('./_db');
module.exports = db;


var User = require('./models/user');
var Author = require('./models/author');
var Address = require('./models/address');
var Books = require('./models/book');
var Review = require('./models/review'); // will be a join table with User and Book

