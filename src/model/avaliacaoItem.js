const {Sequelize, DataTypes} = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const AvaliacaoItem = database.define('avaliacaoItem', {
    id_avaliacao_item: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    avaliacao_usuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nota_usuario: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    url_imagem: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_estabelecimento:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_item:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_usuario:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_avaliacao:{
        type: DataTypes.DATE,
        defaultValues: DataTypes.NOW,
        allowNull: false
    }
});

module.exports = AvaliacaoItem;