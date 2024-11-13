const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const Estado = database.define('estado', {
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
async function CriarEstados(){
    await Estado.sync({ force: true })
    let valores = ['Anúncio', 'Quero ir', 'Já fui', 'N/A'];

    valores.map(async item => {
        let estado = await Estado.findOne({ where: { descricao: item } });
        if(estado === null){
            Estado.create({descricao: item});
        }
    });
}
CriarEstados();
module.exports = Estado;

