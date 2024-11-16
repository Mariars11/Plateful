const Sequelize = require('sequelize');
const database = require('../db');

const Usuario = database.define('usuario', {
    id_user: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_tipo_usuario:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CNPJ: {
        type: Sequelize.STRING,
        allowNull: true
    },
    nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Usuario;