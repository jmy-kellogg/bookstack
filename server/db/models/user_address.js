'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('user_address', {
    type: {
        type: Sequelize.ENUM('billing', 'shipping'), // eslint-disable-line new-cap
        allowNull: false
    },
    isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});
