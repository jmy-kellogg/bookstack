var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env'));
var db = new Sequelize('bookstack','bookstack', 'bookstack3', {dialect: 'postgres'})
// logging: env.LOGGING,
//  native: env.NATIVE
//});

module.exports = db;
