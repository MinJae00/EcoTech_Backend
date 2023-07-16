const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('category', {
        region: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        withWho:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        transportation: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        scenery: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        mood: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    
    schema.associate = models => {
        models.category.hasMany(models.board, {
            foreignKey: 'category_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})