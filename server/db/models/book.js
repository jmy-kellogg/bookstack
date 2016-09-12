'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book', {
    title: {
        type: Sequelize.STRING
    },
    coverUrl: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    bookScore: {
        type: Sequelize.INTEGER
    }
});
