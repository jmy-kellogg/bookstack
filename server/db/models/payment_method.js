'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('payment_method', {
    token: Sequelize.STRING,
    allowNull: false
});

