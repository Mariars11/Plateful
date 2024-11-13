const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');
const sequelize = require('../db');

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
    url_imagem:{
        type: Sequelize.STRING,
        allowNull: true
    },
    flag_consumido: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    avaliacao_usuario: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nota: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Item;