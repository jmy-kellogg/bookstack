'use strict';
var db = require('./_db');
module.exports = db;


var User = require('./models/user');
var Author = require('./models/author');
var Address = require('./models/address');
var Invoice = require('./models/invoice');
var Review = require('./models/review'); // will be a join table with User and Book
var Publisher = require('./models/publisher');
var Book_Type = require('.models/book_type');
var Book = require('./models/book');
var Line_Item = require('.models/lineitem'); // will be join table between User and Book_Type, with association to Invoice
var User_Address = require('./models/user_address'); //will be join table between User and Address
var Collection = require('./models/collection');
var Book_Collection = require('./models/book_collection');
var PaymentMethod = require('./models/payment_method');



// if we had more models, we could associate them in this file
// e.g. User.hasMany(Reports)

User.belongsToMany(Address, {through: User_Address});
User.belongsToMany(PaymentMethod, {through: 'user_payment'});
User.belongsToMany(Book_Type, {through: Line_Item});
User.belongsToMany(Book, {through: Review});
Book.belongsToMany(Author, {through: 'book_author'});
Book.belongsToMany(Collection, {through: Book_Collection});
Book.belongsTo(Publisher);
Book_Type.belongsTo(Book);
Line_Item.belongsTo(Invoice);
Invoice.belongsTo(User);
Invoice.belongsTo(PaymentMethod);
