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
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    unidade: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Estabelecimento;