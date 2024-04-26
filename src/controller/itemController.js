const Item = require('../model/item');
const Usuario = require('../model/usuario');

function indexView(req, res) {
    res.render('index.html');
}
function cadastroView(req, res) {
    res.render('cadastro.html');
}
function homeView(req, res) {
    Item.findAll({
        where: {
            id_usuario: req.session.usuario.id_user,
            id_estabelecimento: req.params.idEstabelecimento
        }
    }).then((itens)=>{
        res.render('listaItens.html', {itens});
    }).catch((erro_recupera_itens)=>{
        res.render('listaItens.html', {erro_recupera_itens});
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
function cadastrarItem(req, res) {
    let idEstabelecimento = String(req.params.idEstabelecimento);
    console.log(idEstabelecimento);
    let item = {
        titulo: req.body.titulo,
        id_usuario: req.session.usuario.id_user,
        id_estabelecimento: req.params.idEstabelecimento,
        preco: req.body.preco,
        nota: req.body.nota
    }
    if(item.preco != "" && item.titulo != "" && item.nota != ""){
            Item.create(item).then(()=>{
                res.redirect('/lista_itens/' + idEstabelecimento);
            }).catch((err)=>{
                console.log(err);
                let erro_cadastrar_item = true;
                res.render("listaItens.html", {erro_cadastrar_item});
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
        }) 
        item.save()
       
        res.redirect('/lista_itens/' + req.params.idEstabelecimento);
    }).catch((erro_recupera_item)=>{
        res.render('editarItem.html', {erro_recupera_item});
    }); 
}
function excluirItem(req, res) {
    Item.findOne({
        where: {
            id_item: req.params.id,
        }
    }).then((item)=>{
        item.destroy();
        res.redirect('/lista_itens/' + req.params.idEstabelecimento);
    }).catch((items)=>{
        res.render('listaItens.html', {erro_recupera_itens});
    }); 
}
module.exports = {
    indexView,
    homeView,
    homeViewOne,
    cadastrarItem,
    cadastroView,
    editarItem,
    excluirItem
}