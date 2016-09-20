'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book_type', {
    type: {
        type: Sequelize.ENUM('ebook', 'paperback', 'hardcover', 'leatherbound'), // eslint-disable-line new-cap
        allowNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        // allowNull: true,
        // min: 0
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        min: 0
    },
    num_pages: {
        type: Sequelize.INTEGER,
        min: 0
    }
}, {
    getterMethods: {
        price: function() {
            return (this.getDataValue('price') / 100).toFixed(2)
        }
    },
    setterMethods: {
        price: function(value) {
            this.setDataValue('price', Math.round(value * 100));
        }
    }
});
