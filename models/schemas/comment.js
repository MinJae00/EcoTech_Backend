const Sequelize = require('sequelize');
var models = require('..');

module.exports = ((sequelize, DataTypes) => {

    var schema = sequelize.define('comment', {
        content: {
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
        models.comment.belongsTo(models.board, {
            foreignKey: 'board_id',
            onDelete: "CASCADE",
        })
    };
    return schema;
})