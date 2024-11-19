const Usuario = require('../model/usuario');
const Estabelecimento = require('../model/estabelecimento');
const Item = require('../model/item');
const Estado = require('../model/estado');

const TipoUsuario = require('../model/tipoUsuario');
const AvaliacaoEstabelecimento = require('../model/avaliacaoEstabelecimento');
const AvaliacaoItem = require('../model/avaliacaoItem');

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
            let tu_estabelecimento = await TipoUsuario.findOne({where: {
                descricao: 'Estabelecimento'
            }});
            let tu_cliente = await TipoUsuario.findOne({where: {
                descricao: 'Cliente'
            }});
            await Estabelecimento.findAll({
                where: {
                    id_tipo_usuario: tu_estabelecimento.id
                }}).then(async (estabelecimentos) =>{
                    await CriarEstabelecimentosCliente(estabelecimentos, usuario, tu_cliente);
                })
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
async function CriarEstabelecimentosCliente(estabelecimentos, cliente, tu_cliente){
    await estabelecimentos.map(async est =>{
        let estabelecimento = await Estabelecimento.findOne(
        { 
            where: { id_usuario: cliente.id_user, nome: est.nome } 
        });
        if(estabelecimento === null){
            let estadoAnuncio = await Estado.findOne({
                where: {
                    descricao: 'Anúncio'
                }
            });
            let estCliente = {
                nome: est.nome,
                id_usuario: cliente.id_user,
                unidade: est.unidade,
                id_tipo_usuario: tu_cliente.id,
                descricao: est.descricao,
                id_estado: estadoAnuncio.id,
                url_imagem_estabelecimento: est.imagem,
                endereco: est.endereco,
            };
            await Estabelecimento.create(estCliente);
        }
    });
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
    }).then((usuario)=>{
        usuario.update({
            nome: req.body.nome,
            email: req.body.email,
            data_nascimento: req.body.data_nascimento,
            indicador_ativo: req.body.indicador_ativo,
            senha: req.body.senha
        }) 

        if(usuario.email != "" && usuario.data_nascimento != ""
    && usuario.nome != "" && usuario.senha)
    {
        usuario.save()
        var sucesso = "realizado!"; 

        res.render('editarPerfil.html', {usuario, sucesso});
    }
    }).catch((erro)=>{
        res.render('editarPerfil.html', {erro});
    }); 
}
// function OneUser(req, res) {
//     Usuario.findOne({
//         where: {
//             id_user: req.session.usuario.id_user,
//         }
//     }).then((usuario)=>{
//         Estabelecimento.findAll({
//             where: {
//                 id_usuario: usuario.id_user,
//             }
//         }).then((estabelecimentos)=>{
//             res.render('home.html', {estabelecimentos, usuario});
//         }).catch((erro_recupera_estabelecimentos)=>{
//             res.render('home.html', {erro_recupera_estabelecimentos});
//         }); 
//     }).catch((erro_alterar_usuario)=>{
//         res.render('home.html', {erro_alterar_usuario});
//     });  
// }
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
function OneUserEdit(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        res.render('editarPerfil.html', {usuario});
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