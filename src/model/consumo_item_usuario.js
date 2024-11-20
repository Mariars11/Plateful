const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const ConsumoItemUsuario = database.define('consumoItemUsuario', {
    id_consumo_item_usuario:{
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
    id_item: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    flag_consumo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
    
});

module.exports = ConsumoItemUsuario;

