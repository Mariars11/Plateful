const Usuario = require('../model/usuario');
const Desejo = require('../model/desejo');

async function autenticar(req, res){
    const usuario = await Usuario.findOne({ where: {
        email: req.body.email, 
        senha: req.body.senha}
    });
    if(usuario !== null){
        req.session.autorizado = true;
        req.session.usuario = usuario;
        res.redirect('/home');
    }
    else{
        let erro_autenticacao = true;
        res.render('index.html', {erro_autenticacao});
    }
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
function OneUser(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Desejo.findAll({
            where: {
                id_usuario: usuario.id_user,
                indicador_ativo: 1
            }
        }).then((desejos)=>{
            res.render('home.html', {desejos, usuario});
        }).catch((erro_recupera_desejos)=>{
            res.render('home.html', {erro_recupera_desejos});
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
    OneUser,
    editarUsuario,
    OneUserEdit
}