const {
    homeViewItem,
    homeViewOne,
    cadastrarItem,
    editarItem,
    excluirItem,
    viewOneItemCliente,
    changeCreateConsumo
} = require('../../src/controller/itemController');

const Item = require('../../src/model/item');
const ConsumoItemCliente = require('../../src/model/consumo_item_usuario');
const AvaliacaoItem = require('../../src/model/avaliacaoItem');

// Mockando os modelos
jest.mock('../../src/model/item');
jest.mock('../../src/model/consumo_item_usuario');
jest.mock('../../src/model/avaliacaoItem');

describe('Item Controller', () => {
    let req, res;
    const originalConsoleError = console.error;
    const originalConsoleLog = console.log;

    // Supressão de logs durante os testes
    beforeAll(() => {
        console.error = jest.fn();
        console.log = jest.fn();
    });

    afterAll(() => {
        console.error = originalConsoleError;
        console.log = originalConsoleLog;
    });

    beforeEach(() => {
        req = {
            session: { usuario: { id_user: 1 } },
            params: {},
            body: {}
        };
        res = {
            render: jest.fn(),
            redirect: jest.fn()
        };
        jest.clearAllMocks();
    });

    test('cadastrarItem redirects on success', async () => {
        req.params.idEstabelecimento = 1;
        req.body = {
            titulo: 'Item',
            preco: '10',
            descricao: 'Desc',
            imagem: 'url',
            categoria: 1
        };

        Item.create.mockResolvedValue({}); // Simula sucesso na criação

        await cadastrarItem(req, res);

        expect(Item.create).toHaveBeenCalledWith({
            titulo: 'Item',
            id_usuario: 1,
            id_estabelecimento: 1,
            preco: '10',
            descricao: 'Desc',
            url_imagem: 'url',
            id_categoria: 1
        });
        expect(res.redirect).toHaveBeenCalledWith('/homeRestaurante');
    });

    test('excluirItem redirects on success', async () => {
        req.params.id = 1;

        const mockItem = { destroy: jest.fn().mockResolvedValue() };

        Item.findOne.mockResolvedValue(mockItem);

        await excluirItem(req, res);

        expect(Item.findOne).toHaveBeenCalledWith({ where: { id_item: 1 } });
        expect(mockItem.destroy).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith('/homeRestaurante');
    });

    test('viewOneItemCliente renders itemCliente.html with item and avaliacaoItem', async () => {
        req.params.idItem = 1;

        const mockItem = { id_item: 1, flag_consumido: true };
        const mockAvaliacao = { id_usuario: 1, id_item: 1 };
        const mockConsumo = { flag_consumo: true };

        Item.findOne.mockResolvedValue(mockItem);
        AvaliacaoItem.findOne.mockResolvedValue(mockAvaliacao);
        ConsumoItemCliente.findOne.mockResolvedValue(mockConsumo);

        await viewOneItemCliente(req, res);

        expect(Item.findOne).toHaveBeenCalledWith({ where: { id_item: 1 } });
        expect(AvaliacaoItem.findOne).toHaveBeenCalledWith({ where: { id_usuario: 1, id_item: 1 } });
        expect(ConsumoItemCliente.findOne).toHaveBeenCalledWith({ where: { id_usuario: 1, id_item: 1 } });
        expect(res.render).toHaveBeenCalledWith('itemCliente.html', { item: mockItem, avaliacaoItem: mockAvaliacao });
    });

    test('changeCreateConsumo redirects after update', async () => {
        req.params.idItem = 1;
        req.params.idEstabelecimento = 1;
        req.body.consumido = 'on';

        const mockConsumo = { update: jest.fn().mockResolvedValue(), save: jest.fn().mockResolvedValue() };

        ConsumoItemCliente.findOne.mockResolvedValue(mockConsumo);

        await changeCreateConsumo(req, res);

        expect(ConsumoItemCliente.findOne).toHaveBeenCalledWith({
            where: { id_usuario: 1, id_item: 1, id_estabelecimento: 1 }
        });
        expect(mockConsumo.update).toHaveBeenCalledWith({ flag_consumo: true });
        expect(mockConsumo.save).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith(`/itemCliente/1`);
    });
});

// Configurando o Sequelize para desativar logs em testes
jest.mock('sequelize', () => {
    const Sequelize = jest.requireActual('sequelize');
    return class MockSequelize extends Sequelize {
        constructor() {
            super('sqlite::memory:', { logging: false });
        }
    };
});
