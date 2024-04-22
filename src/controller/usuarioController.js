const Usuario = require('../model/usuario');

function cadastrarUsuario(req, res) {
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento
    }
    if(usuario.email != "" && usuario.data_nascimento != ""
    && usuario.nome != "" && usuario.senha){
        Usuario.create(usuario).then(()=>{
            let sucesso = true;
            res.render("index.html", {sucesso});
        }).catch((err)=>{
            console.log(err);
            let erro = true;
            res.render("index.html", {erro});
        });
    }
    else{
        let erro = true;
        res.render("cadastro.html", {erro});
    }
    

}

function listarUsuarios(req, res) {
    Usuario.findAll().then((usuarios)=>{
        res.json(usuarios);
    }).catch((err)=>{
        res.json(err);
    });
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios,
}