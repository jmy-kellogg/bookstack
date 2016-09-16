'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('line_item', {
    status: {
        type: Sequelize.ENUM('viewed', 'cart', 'purchased', 'returned')
    },
    unit_price: {
        type: Sequelize.INTEGER
    },
    quantity: {
        type: Sequelize.INTEGER
    }
}, {
    getterMethods: {
        unit_price: function() {
            return (this.getDataValue('unit_price') / 100).toFixed(2)
        }
    },
    setterMethods: {
        unit_price: function(value) {
            this.setDataValue('unit_price', Math.round(value * 100));
        }
    }
});
