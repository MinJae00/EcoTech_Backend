const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('item', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        e_sum_m: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        e_sum_e: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        e_sum_c: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        f_sum_c: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        c_sum_m: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        c_sum_e: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        c_sum_c: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        a_sum_m: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        a_sum_e: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        a_sum_c: {
            type: Sequelize.DOUBLE,
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

