const Usuario = require('../model/usuario');
const TipoUsuario = require('../model/tipoUsuario');
async function cadastrarUsuario(req, res) {
    let tipoUsuario = await TipoUsuario.findOne({where: {
        descricao: req.body.tipoUsuario
    }});
    let isCliente = req.body.tipoUsuario === 'Cliente';
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nome: req.body.nome,
        endereco: req.body.endereco,
        nome_fantasia: req.body.nomeFantasia,
        CNPJ: req.body.cnpj,
        id_tipo_usuario: tipoUsuario.id
    }
    if(usuario.email != "" && usuario.senha && usuario.id_tipo_usuario != ""){
        Usuario.create(usuario).then(()=>{
            let sucesso = true;
            if(isCliente){
                res.render("loginConsumidor.html", {sucesso});
            }
            else{
                res.render("loginRestaurante.html", {sucesso});
            }
        }).catch((err)=>{
            console.log(err);
            let erro = true;
            if(isCliente){
                res.render("loginConsumidor.html", {erro});
            }
            else{
                res.render("loginRestaurante.html", {erro});
            }
        });
    }
    else{
        let erro = true;
        if(isCliente){
            res.render("cadastro.html", {erro});
        }
        else{
            res.render("cadastroRestaurante.html", {erro});
        }
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