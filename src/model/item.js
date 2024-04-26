const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const Item = database.define('item', {
    id_item: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_estabelecimento: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    nota: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Item;