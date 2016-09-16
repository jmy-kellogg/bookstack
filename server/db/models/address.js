'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('address', {
    address_line_one: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address_line_two: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true, 
        len: [2]
    },
    zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        len: [4,5],
    }
});


