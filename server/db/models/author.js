'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('author', {
    FirstName: {
        type: Sequelize.STRING,
        allowNull: false;
    },
    LastName: {
        type: Sequelize.STRING,
        allowNull: false;
    },
    MiddleInitial: {
        type: Sequelize.STRING
    },
    PictureUrl: {
        type: Sequelize.STRING
    }
});
