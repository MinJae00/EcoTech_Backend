const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('user', {
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        provider:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        provider_id: {
            type: Sequelize.TEXT,
            allowNull: false,
        },

    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    
    return schema;
})