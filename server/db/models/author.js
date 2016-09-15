'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('author', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middle_initial: {
        type: Sequelize.STRING
    },
    picture_url: {
        type: Sequelize.STRING
    }
},
{
    getterMethods: {
        full_name: function(){
            return this.first_name + ' ' + this.last_name
        }
    }
});
