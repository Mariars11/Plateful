const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const TipoUsuario = database.define('tipo_usuario', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
async function CriarTipoUsuarios(){
    await TipoUsuario.sync()
    let valores = ['Cliente', 'Estabelecimento'];

    valores.map(async item => {
        let tipoUsuario = await TipoUsuario.findOne({ where: { descricao: item } });
        if(tipoUsuario === null){
            TipoUsuario.create({descricao: item});
        }
    });
}
CriarTipoUsuarios();
module.exports = TipoUsuario;

