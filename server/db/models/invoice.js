'use strict';

var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('invoice', {
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT
    }
    // using sequelize's created at field
}, {
    getterMethods: {
        total: function() {
            return (this.getDataValue('total') / 100).toFixed(2)
        }
    },
    setterMethods: {
        total: function(value) {
            this.setDataValue('total', Math.round(value * 100));
        }
    }
});
