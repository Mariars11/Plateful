const Usuario = require('../model/usuario');
const TipoUsuario = require('../model/tipoUsuario');
const Estabelecimento = require('../model/estabelecimento');
const Estado = require('../model/estado');
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
        Usuario.create(usuario).then(async (cliente)=>{
            let sucesso = true;
            if(isCliente){
                let tu_estabelecimento = await TipoUsuario.findOne({where: {
                    descricao: 'Estabelecimento'
                }});
                let tu_cliente = await TipoUsuario.findOne({where: {
                    descricao: 'Cliente'
                }});
                Estabelecimento.findAll({
                    where: {
                        id_tipo_usuario: tu_estabelecimento.id
                    }}).then((estabelecimentos) =>{
                        CriarEstabelecimentosCliente(estabelecimentos, cliente, tu_cliente);
                    })
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
async function CriarEstabelecimentosCliente(estabelecimentos, cliente, tu_cliente){
    estabelecimentos.map(async est =>{
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
                url_imagem_estabelecimento: est.url_imagem_estabelecimento,
                endereco: est.endereco,
            };
            await Estabelecimento.create(estCliente);
        }
    });
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