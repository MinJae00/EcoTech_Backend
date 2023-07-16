const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('board', {
        travel_name: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        travel_picture:{
            type: Sequelize.TEXT,
            allowNull: false,
        },
        travel_intro: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        travel_tip: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        travel_hash:{
            type: Sequelize.TEXT,
            allownull : false
        },
        travel_location: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
        
    }, {
        timestamps: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    
    schema.associate = models => {
        models.board.belongsTo(models.category, {
            foreignKey: 'category_id',
            onDelete: "CASCADE",
        })
        models.board.hasMany(models.comment, {
            foreignKey: 'board_id',
            onDelete: "CASCADE",
        })
    };

    return schema;
})