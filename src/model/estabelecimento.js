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
    url_imagem_estabelecimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull: true
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_item: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    avaliacao_usuario: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nota_usuario: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

module.exports = Estabelecimento;