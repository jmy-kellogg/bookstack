'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book_collection', {
    place_in_series: {
    	type: Sequelize.INTEGER
    }
});