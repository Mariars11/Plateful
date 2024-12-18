const Item = require('../model/item');
const Usuario = require('../model/usuario');
const Categoria = require('../model/categoria');
const Estado = require('../model/estado');
const TipoUsuario = require('../model/tipoUsuario');
const Estabelecimento = require('../model/estabelecimento');
const EstadoClienteEstabelecimento = require('../model/estado_cliente_estabelecimento');
const AvaliacaoItem = require('../model/avaliacaoItem');
const { where, Op } = require('sequelize');
const AvaliacaoEstabelecimento = require('../model/avaliacaoEstabelecimento');

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
            if(restaurante !== null){
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
            }
            else{
                res.render('homeRestaurante.html', {restaurante, categorias});
            }
            
        })
    }).catch((erro_recupera_estabelecimento)=>{
        res.render('homeRestaurante.html', {erro_recupera_estabelecimento});
    });
}
async function homeView(req, res){  
    let estadoAnuncios = await Estado.findOne({where: {
        descricao: 'Anúncio',
    }}); 
    let estadoQueroIr = await Estado.findOne({where: {
        descricao: 'Quero ir',
    }});
    let estadoJaFui = await Estado.findOne({where: {
        descricao: 'Já fui',
    }});
    let estabelecimentosEstadoAnuncios = await EstadoClienteEstabelecimento.findAll({
        where:{
            id_estado: estadoAnuncios.id,
            id_usuario: req.session.usuario.id_user
        }
    });
    let estabelecimentosAnuncios = [];
    estabelecimentosEstadoAnuncios.map(async est =>{
        Estabelecimento.findOne({
            where:{
                id_estabelecimento: est.id_estabelecimento
            }
        }).then((estabelecimentoAnuncio) =>{
            estabelecimentosAnuncios.push(estabelecimentoAnuncio)
        })
    })
    let estabelecimentosEstadoQueroIr = await EstadoClienteEstabelecimento.findAll({
        where:{
            id_estado: estadoQueroIr.id,
            id_usuario: req.session.usuario.id_user
        }
    });
    let estabelecimentosQueroIr = [];
    estabelecimentosEstadoQueroIr.map(async est =>{
        Estabelecimento.findOne({
            where:{
                id_estabelecimento: est.id_estabelecimento
            }
        }).then((estabelecimentoQueroIr) =>{
            estabelecimentosQueroIr.push(estabelecimentoQueroIr)
        })
    })
    let estabelecimentosEstadoJaFui = await EstadoClienteEstabelecimento.findAll({
        where:{
            id_estado: estadoJaFui.id,
            id_usuario: req.session.usuario.id_user
        }
    });
    let estabelecimentosJaFui = [];
    estabelecimentosEstadoJaFui.map(async est =>{
        Estabelecimento.findOne({
            where:{
                id_estabelecimento: est.id_estabelecimento
            }
        }).then((estabelecimentoJaFui) =>{
            estabelecimentosJaFui.push(estabelecimentoJaFui)
        })
    });
    Estabelecimento.findAll({
        }).then((estabelecimentosCliente) =>{
            res.render('home.html', {estabelecimentosAnuncios, estabelecimentosQueroIr, estabelecimentosJaFui}); 
        }).catch((erro_recupera_estabelecimentos)=>{
            res.render('home.html', {erro_recupera_estabelecimentos});
        });
}
async function changeEstado(req, res) {
    await EstadoClienteEstabelecimento.findOne({
        where:{
            id_estabelecimento: req.params.id,
            id_usuario: req.session.usuario.id_user
        }
    }).then((estadoClienteEst) =>{
        estadoClienteEst.update({
            id_estado: req.body.estado,
        }) 
        estadoClienteEst.save();
        homeView(req, res);
    })
}

async function homeViewOneCliente(req, res) {
    let estados = await Estado.findAll({
        where:{
            [Op.not]:{
                [Op.or]:[{descricao: 'N/A'}, {descricao: 'Anúncio'}]
            } 
        }
    });
    await Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.idEst
        }
    }).then(async(estabelecimento) =>{
        let avaliacaoEstabelecimento = await AvaliacaoEstabelecimento.findOne({
            where:{
                id_estabelecimento: estabelecimento.id_estabelecimento,
                id_usuario: req.session.usuario.id_user
            }
        });
        console.log(avaliacaoEstabelecimento);
        
        await Item.findAll({
            where:{
                id_estabelecimento: estabelecimento.id_estabelecimento,
            }
        }).then(async (itens) =>{
            
            let entrada = await Categoria.findOne({ where:{descricao: 'Entrada'}});
            let bebida = await Categoria.findOne({where:{descricao: 'Bebida'}});
            let pratoPrincipal = await Categoria.findOne({where:{descricao: 'Prato Principal'}});
            let sobremesa = await Categoria.findOne({where:{descricao: 'Sobremesa'}});

        
            let itensEntrada = itens.filter(({id_categoria}) => id_categoria === entrada.id);
            let itensPrincipal = itens.filter(({id_categoria}) => id_categoria === pratoPrincipal.id);
            let itensBebida = itens.filter(({id_categoria}) => id_categoria === bebida.id);
            let itensSobremesa = itens.filter(({id_categoria}) => id_categoria === sobremesa.id);
            
            
            res.render('estabelecimentoCliente.html', {estados, estabelecimento, itensEntrada, itensPrincipal, itensBebida, itensSobremesa, avaliacaoEstabelecimento})
        }).catch((erro_recupera_estabelecimento)=>{
            res.render('estabelecimentoCliente.html', {erro_recupera_estabelecimento});
        });
    })
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
        res.render('homeRestaraunte.html', {erro_alterar_usuario});
    });
    
} 

async function FindAllEstabelecimentos(res, req){
    await Estabelecimento.findAll({
        where: {id_usuario: req.session.usuario.id_user}
    }).then((estabelecimentosCliente) =>{
        res.render('home.html', {estabelecimentosCliente}); 
    }).catch((erro_recupera_estabelecimentos)=>{
        res.render('home.html', {erro_recupera_estabelecimentos});
    });
}
async function cadastrarEstabelecimento(req, res) {
    let estadoNA = await Estado.findOne({where: {
        descricao: 'N/A'
    }});
    let tu_estabelecimento = await TipoUsuario.findOne({where: {
        descricao: 'Estabelecimento'
    }});
    let estabelecimento = {
        nome: req.body.nome,
        id_usuario: req.session.usuario.id_user,
        unidade: req.body.unidade,
        descricao: req.body.descricao,
        id_estado: estadoNA.id,
        id_tipo_usuario: tu_estabelecimento.id,
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
            descricao: req.body.descricao,
            url_imagem_estabelecimento: req.body.imagem,
            endereco: req.body.endereco,
        }) 
        estabelecimento.save()
        res.redirect('/homeRestaurante');
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
    homeViewOneCliente,
    cadastrarEstabelecimento,
    editarEstabelecimento,
    excluirEstabelecimento,
    homeViewRestaurante,
    changeEstado,
}