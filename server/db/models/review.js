'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    stars: {
        type: Sequelize.FLOAT
    },
    comments: {
        type: Sequelize.TEXT
    }
});
