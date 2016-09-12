'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('book', {
    title: {
        type: Sequelize.STRING
    },
    cover_url: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    book_score: {
        type: Sequelize.INTEGER
    }
});
