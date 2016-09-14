'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('user_payment', {
    id : {
        type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true
    }
});
