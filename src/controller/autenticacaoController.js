const Usuario = require('../model/usuario');
const Estabelecimento = require('../model/estabelecimento');
const Item = require('../model/item');
const Estado = require('../model/estado');
const EstadoClienteEstabelecimento = require('../model/estado_cliente_estabelecimento');
const ConsumoItemCliente = require('../model/consumo_item_usuario');
const TipoUsuario = require('../model/tipoUsuario');


const { where } = require('sequelize');

function loginConsumidorView(req, res) {
    res.render('loginConsumidor.html');
}
function loginRestauranteView(req, res) {
    res.render('loginRestaurante.html');
}
function cadastroConsumidorView(req, res){
    res.render('cadastro.html');
}
function cadastroRestauranteView(req, res){
    res.render('cadastroRestaurante.html');
}
async function autenticar(req, res){   
    let tipoUsuario = await TipoUsuario.findOne({where: {
        descricao: req.body.tipoUsuario
    }});
    let isCliente = req.body.tipoUsuario === 'Cliente';
    const usuario = await Usuario.findOne({ where: {
        email: req.body.email, 
        senha: req.body.senha,
        id_tipo_usuario: tipoUsuario.id
        }
    });
    if(usuario !== null){
        req.session.autorizado = true;
        req.session.usuario = usuario;
        if(isCliente){
            CriarEstabelecimentosCliente(req.session.usuario);
            await res.redirect('/home');
        }
        else{
            res.redirect('/homeRestaurante');
        }
    }
    else{
        let erro_autenticacao = true;
        if(isCliente){
            res.render('loginConsumidor.html', {erro_autenticacao});
        }
        else{
            res.render('loginRestaurante.html', {erro_autenticacao});
        }
    }
}
async function CriarEstabelecimentosCliente(cliente){
    Estabelecimento.findAll({
    }).then(async(estabelecimentos) =>{
        estabelecimentos.map(async est =>{
            let estabelecimentoCliente = await EstadoClienteEstabelecimento.findOne({
                where:{
                    id_usuario: cliente.id_user,
                    id_estabelecimento: est.id_estabelecimento
                }
            });
            if(estabelecimentoCliente === null){
                let estadoAnuncio = await Estado.findOne({
                    where: {
                        descricao: 'Anúncio'
                    }
                });
                let estado_cliente_estabelecimento = {
                    id_estabelecimento: est.id_estabelecimento,
                    id_usuario: cliente.id_user,
                    id_estado: estadoAnuncio.id
                };
                await EstadoClienteEstabelecimento.create(estado_cliente_estabelecimento);
                Item.findAll({
                    where:{
                        id_estabelecimento: est.id_estabelecimento
                    }
                }).then(async(items)=>{
                    items.map(async item =>{
                        let itemCliente = await ConsumoItemCliente.findOne({
                            where:{
                                id_usuario: cliente.id_user,
                                id_item: item.id_item,
                                id_estabelecimento: est.id_estabelecimento
                            }
                        });
                        if(itemCliente === null){
                            let consumo = {
                                id_usuario: cliente.id_user,
                                id_estabelecimento: est.id_estabelecimento,
                                id_item: item.id_item,
                                flag_consumo: false
                            };
                            await ConsumoItemCliente.create(consumo);
                        }
                    })
                })
            }
        })
    })
}
function verificarAutenticacao(req, res, next) {
    if(req.session.autorizado){
        console.log("usuário autorizado");
        next();
    }
    else{
        console.log("usuário NÃO autorizado");
        res.redirect('/');
    }   
}
function editarUsuario(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then(async (usuario)=>{
        usuario.update({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            CNPJ: req.body.cnpj,
            nome_fantasia: req.body.nomeFantasia,
        }) 

        if(usuario.email != "" && usuario.nome != "" && usuario.senha)
        {
            usuario.save()
            var sucesso = "Usuário atualizado com sucesso!"; 
            let tipoUsuario = await TipoUsuario.findOne({where: {
                id: usuario.id_tipo_usuario
            }});
    
            if(tipoUsuario.descricao === 'Cliente'){
                res.render('editarPerfil.html', {usuario, sucesso});
            }
            else{
                res.render('editarPerfilEstabelecimento.html', {usuario, sucesso});
            }
        }
    }).catch((erro)=>{
        res.render('editarPerfil.html', {erro});
    }); 
}

function OneUserItem(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Estabelecimento.findOne({
            where: {
                id_usuario: usuario.id_user,
                id_estabelecimento: req.params.idEstabelecimento,
            }
        }).then((estabelecimento)=>{
            Item.findAll({
                where:{
                    id_estabelecimento: req.params.idEstabelecimento
                }
            }).then((itens)=>{
                res.render('listaItens.html', {itens, estabelecimento, usuario});
            })
        }).catch((erro_recupera_itens)=>{
            res.render('listaItens.html', {erro_recupera_itens});
        }); 
    }).catch((erro_alterar_usuario)=>{
        res.render('home.html', {erro_alterar_usuario});
    });  
}
async function OneUserEdit(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then(async(usuario)=>{
        let tipoUsuario = await TipoUsuario.findOne({where: {
            id: usuario.id_tipo_usuario
        }});

        if(tipoUsuario.descricao === 'Cliente'){
            res.render('editarPerfil.html', {usuario});
        }
        else{
            res.render('editarPerfilEstabelecimento.html', {usuario});
        }
    }).catch((erro)=>{
        res.render('editarPerfil.html', {erro});
    });  
}



function sair(req, res) {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    autenticar,
    verificarAutenticacao,
    sair,
    OneUserItem,
    editarUsuario,
    OneUserEdit,
    loginConsumidorView,
    loginRestauranteView,
    cadastroConsumidorView,
    cadastroRestauranteView
}