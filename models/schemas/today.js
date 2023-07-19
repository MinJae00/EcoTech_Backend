const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('today', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        electronic: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        co2: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        save_check: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
    
    }, {
        timestamps: true,
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
    });
    
    schema.associate = models => {
        models.user.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: "CASCADE",
        })
    };

    return schema;
})
