'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('author', {
    total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    datetime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING
    }
});
