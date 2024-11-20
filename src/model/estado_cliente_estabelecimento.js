const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const EstadoClienteEstabelecimento = database.define('estadoClienteEstabelecimento', {
    id_estado_cliente_estabelecimento:{
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
    id_estado: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = EstadoClienteEstabelecimento;

