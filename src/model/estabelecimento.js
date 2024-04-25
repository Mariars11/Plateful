const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const Estabelecimento = database.define('estabelecimento', {
    id_estabelecimento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = Estabelecimento;