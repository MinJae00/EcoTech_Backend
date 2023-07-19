const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('accum', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        electronic: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },
        co2: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },
        money: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
        },

    }, {
        timestamps: false,
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