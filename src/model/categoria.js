const Sequelize = require('sequelize');
const database = require('../db');
const { type } = require('express/lib/response');

const Categoria = database.define('categoria', {
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
async function CriarCategoria(){
    await Categoria.sync({ force: true })
    let valores = ['Entrada', 'Prato Principal', 'Sobremesa', 'Bebida'];

    valores.map(async item => {
        let categoria = await Categoria.findOne({ where: { descricao: item } });
        if(categoria === null){
            Categoria.create({descricao: item});
        }
    });
}
CriarCategoria();
module.exports = Categoria;

