const Item = require('../model/item');
const Usuario = require('../model/usuario');
const Categoria = require('../model/categoria');
const Estado = require('../model/estado');
const Estabelecimento = require('../model/estabelecimento');
const { where } = require('sequelize');

function indexView(req, res) {
    res.render('index.html');
}
async function homeViewRestaurante(req, res){
    Estabelecimento.findOne({
        where: {
            id_usuario: req.session.usuario.id_user,
        }
    }).then(async restaurante =>{
        let entrada = await Categoria.findOne({ where:{descricao: 'Entrada'}});
        let bebida = await Categoria.findOne({where:{descricao: 'Bebida'}});
        let pratoPrincipal = await Categoria.findOne({where:{descricao: 'Prato Principal'}});
        let sobremesa = await Categoria.findOne({where:{descricao: 'Sobremesa'}});

        Categoria.findAll({}).then((categorias)=>{
            Item.findAll({
                where:{
                    id_usuario: req.session.usuario.id_user,
                    id_estabelecimento: restaurante.id_estabelecimento
                },
            }).then((itens)=>{
                let itensEntrada = itens.filter(({id_categoria}) => id_categoria === entrada.id);
                let itensPrincipal = itens.filter(({id_categoria}) => id_categoria === pratoPrincipal.id);
                let itensBebida = itens.filter(({id_categoria}) => id_categoria === bebida.id);
                let itensSobremesa = itens.filter(({id_categoria}) => id_categoria === sobremesa.id);
                
                res.render('homeRestaurante.html', {restaurante, categorias, itensEntrada,itensPrincipal, itensBebida, itensSobremesa});
            })
        })
    }).catch((erro_recupera_estabelecimento)=>{
        res.render('homeRestaurante.html', {erro_recupera_estabelecimento});
    });
}

function homeView(req, res) {
    Estabelecimento.findAll({
        where: {
            id_usuario: req.session.usuario.id_user,
        }
    }).then((estabelecimentos)=>{
        res.render('home.html', {estabelecimentos});
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('home.html', {erro_recupera_estabelecimentos});
    }); 
}

function homeViewOne(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Estabelecimento.findOne({
            where: {
                id_estabelecimento: req.params.id,
            }
        }).then((estabelecimento)=>{
            res.render('editarEstabelecimento.html', {estabelecimento, usuario});
        }).catch((erro_recupera_estabelecimentos)=>{
            res.render('editarEstabelecimento.html', {erro_recupera_estabelecimentos});
        }); 
    }).catch((erro_alterar_usuario)=>{
        res.render('home.html', {erro_alterar_usuario});
    });
    
}
async function cadastrarEstabelecimento(req, res) {
    let estadoNA = await Estado.findOne({where: {
        descricao: 'N/A'
    }});
    let estabelecimento = {
        nome: req.body.nome,
        id_usuario: req.session.usuario.id_user,
        unidade: req.body.unidade,
        descricao: req.body.descricao,
        id_estado: estadoNA.id,
        url_imagem_estabelecimento: req.body.imagem,
        endereco: req.body.endereco,
    }
    if(estabelecimento.nome != "" && estabelecimento.endereco != ""){
            Estabelecimento.create(estabelecimento).then(()=>{
                res.redirect('/homeRestaurante');
            }).catch((err)=>{
                console.log(err);
                let erro_cadastrar_estabelecimento = true;
                res.render("homeRestaurante.html", {erro_cadastrar_estabelecimento});
            });
        }
}
function editarEstabelecimento(req, res) {
    Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.id,
        }
    }).then((estabelecimento)=>{
        estabelecimento.update({
            nome: req.body.nome,
            unidade: req.body.unidade,
        }) 
        estabelecimento.save()
        res.redirect('/home');
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('editarEstabelecimento.html', {erro_recupera_estabelecimentos});
    }); 
}
function excluirEstabelecimento(req, res) {
    Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.id,
        }
    }).then((estabelecimento)=>{
        estabelecimento.destroy();
        res.redirect('/home');
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('home.html', {erro_recupera_estabelecimentos});
    }); 
}
module.exports = {
    indexView,
    homeView,
    homeViewOne,
    cadastrarEstabelecimento,
    editarEstabelecimento,
    excluirEstabelecimento,
    homeViewRestaurante,
}