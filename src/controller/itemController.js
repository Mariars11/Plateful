const Estabelecimento = require('../model/estabelecimento');
const Item = require('../model/item');
const Categoria = require('../model/categoria');
const Usuario = require('../model/usuario');
const ConsumoItemCliente = require('../model/consumo_item_usuario');
const AvaliacaoItem = require('../model/avaliacaoItem');

function indexView(req, res) {
    res.render('index.html');
}
function cadastroView(req, res) {
    res.render('cadastro.html');
}
function homeViewItem(req, res) {
    Item.findAll({
        where: {
            id_usuario: req.session.usuario.id_user
        }        
    }).then((itens)=>{
        res.render('homeRestaurante.html', {itens});
    }).catch((erro_recupera_itens)=>{
        res.render('homeRestaurante.html', {erro_recupera_itens});
    }); 
}

function homeViewOne(req, res) {
    Usuario.findOne({
        where: {
            id_user: req.session.usuario.id_user,
        }
    }).then((usuario)=>{
        Item.findOne({
            where: {
                id_item: req.params.id,
                id_estabelecimento: req.params.idEstabelecimento
            }
        }).then((item)=>{
            res.render('editarItem.html', {item, usuario});
        }).catch((erro_recupera_itens)=>{
            res.render('editarItem.html', {erro_recupera_itens});
        }); 
    }).catch((erro_alterar_usuario)=>{
        res.render('listaItens.html', {erro_alterar_usuario});
    });
    
}
function changeCreateConsumo(req, res){
    ConsumoItemCliente.findOne({
        where:{
            id_usuario: req.session.usuario.id_user,
            id_item: req.params.idItem,
            id_estabelecimento: req.params.idEstabelecimento
        }
    }).then((consumoItemCliente) =>{
        console.log(consumoItemCliente);
        let consumo = req.body.consumido === 'on';
        
        consumoItemCliente.update({
            flag_consumo: consumo,
        }) 
        consumoItemCliente.save()
       
        res.redirect(`/itemCliente/${req.params.idItem}`);
    })
}
async function viewOneItemCliente(req, res){
    Item.findOne({
        where:{
            id_item: req.params.idItem
        }
    }).then(async (item) =>{
        let avaliacaoItem = await AvaliacaoItem.findOne({
            where:{
                id_usuario: req.session.usuario.id_user,
                id_item: req.params.idItem,
            }
        })
        let consumoItem = await ConsumoItemCliente.findOne({
            where:{
                id_usuario: req.session.usuario.id_user,
                id_item: req.params.idItem,
            }
        });
        if(consumoItem !== null){
            item.flag_consumido = consumoItem.flag_consumo;           
        }
        res.render('itemCliente.html', {item, avaliacaoItem});
    })
}
function cadastrarItem(req, res) {
    let estabelecimento = Estabelecimento.findOne({
        where: {
            id_estabelecimento: req.params.idEstabelecimento
        }
    });
    let categorias = Categoria.findAll({
    });
    let idEstabelecimento = String(req.params.idEstabelecimento);
    let item = {
        titulo: req.body.titulo,
        id_usuario: req.session.usuario.id_user,
        id_estabelecimento: req.params.idEstabelecimento,
        preco: req.body.preco,
        descricao: req.body.descricao,
        url_imagem: req.body.imagem,
        id_categoria: req.body.categoria
    }
    if(item.preco != "" && item.titulo != "" && item.nota != "" && item.id_categoria != 0){
            Item.create(item).then(()=>{
                let sucessItem = true;
                // res.render("homeRestaurante.html", estabelecimento, categorias);
                res.redirect("/homeRestaurante", estabelecimento, categorias, sucessItem);

            }).catch((err)=>{
                console.log(err);
                let erro_cadastrar_item = true;
                res.render("homeRestaurante.html", {erro_cadastrar_item});
            });
        }
}
function editarItem(req, res) {
    Item.findOne({
        where: {
            id_item: req.params.id,
        }
    }).then((item)=>{
        item.update({
            titulo: req.body.titulo,
            preco: req.body.preco,
            url_imagem: req.body.imagem
        }) 
        item.save()
       
        res.redirect('/homeRestaurante');
    }).catch((erro_recupera_item)=>{
        res.render('homeRestaurante.html', {erro_recupera_item});
    }); 
}
function excluirItem(req, res) {
    Item.findOne({
        where: {
            id_item: req.params.id,
        }
    }).then((item)=>{
        item.destroy();
        res.redirect('/homeRestaurante');
    }).catch((erro_recupera_itens)=>{
        res.render('homeRestaurante.html', {erro_recupera_itens});
    }); 
}
module.exports = {
    indexView,
    homeViewItem,
    homeViewOne,
    cadastrarItem,
    cadastroView,
    editarItem,
    excluirItem,
    viewOneItemCliente,
    changeCreateConsumo
}