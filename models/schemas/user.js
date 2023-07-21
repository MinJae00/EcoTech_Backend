const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('user', {
        user_id: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        metro: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        city: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
        aircond_habit: {
            type: Sequelize.INTEGER,
            allowNUll: false,
        },
        car_habit: {
            type: Sequelize.INTEGER,
            allowNull : false,
        },
        house_cnt: {
            type: Sequelize.INTEGER,
            allowNull : false,
        },
        power_usage: {
            type: Sequelize.INTEGER,
            allowNull : false
        },
        nickname: {
            type: Sequelize.TEXT,
            allowNull : false
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull : true
        },
        level: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    }, {
        timestamps: false,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    schema.associate = models => {
        models.user.hasMany(models.today, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasMany(models.dal, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasMany(models.item, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
        models.user.hasMany(models.accum, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
    }
    return schema;
})