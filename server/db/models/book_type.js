'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book_type', {
    type: {
        type: Sequelize.ENUM('ebook', 'paperback', 'hardcover', 'leatherbound'),
        allowNull: true,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        min: 0
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
},
    {
    getterMethods: {
        price: function(){
            return this.total / 100;
        }
    },
    setterMethods: {
        price: function(value){
            this.setDataValue('total', Math.round(value * 100));
        }
    }
});
