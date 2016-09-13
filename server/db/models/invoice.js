'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('invoice', {
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT
    }
    // using sequelize's created at field
});
