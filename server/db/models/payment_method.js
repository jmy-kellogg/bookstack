'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('payment_method', {
    token: {
		type: Sequelize.STRING,
		allowNull: false
    },
    lastFour: {
		type: Sequelize.STRING,
	}
});

