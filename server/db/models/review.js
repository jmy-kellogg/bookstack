'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {
    stars: {
        type: Sequelize.FLOAT,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    },
    comments: {
        type: Sequelize.TEXT,
    }
});
