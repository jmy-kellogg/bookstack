'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('lineitem', {
    status: {
        type: Sequelize.ENUM('viewed', 'cart', 'purchased', 'returned')
    },
    unit_price: {
        type: Sequelize.DECIMAL(10, 2)
    },
    quantity: {
        type: Sequelize.INTEGER
    }
});
