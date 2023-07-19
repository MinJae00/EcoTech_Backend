const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('message', {
        message: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });

    return schema;
})