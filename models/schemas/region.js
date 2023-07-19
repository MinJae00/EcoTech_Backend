const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('month', {
        name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        code: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

    }, {
        timestamps: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    return schema;
})
