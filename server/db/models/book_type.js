'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book_type', {
    type: {
        type: Sequelize.ENUM('ebook', 'paperback', 'hardcover', 'leatherbound')
    },
    price: {
        type: Sequelize.DECIMAL(10, 2)
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    num_pages: {
        type: Sequelize.INTEGER
    }
});
