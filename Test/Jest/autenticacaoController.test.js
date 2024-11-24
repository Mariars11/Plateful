const controller = require('../../src/controller/autenticacaoController');

jest.mock('../../src/model/usuario', () => ({
  findOne: jest.fn()
}));
jest.mock('../../src/model/tipoUsuario', () => ({
  findOne: jest.fn()
}));

const Usuario = require('../../src/model/usuario');
const TipoUsuario = require('../../src/model/tipoUsuario');

describe('Controller Tests - autenticar', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'teste@teste.com',
        senha: 'senha123',
        tipoUsuario: 'Cliente'
      },
      session: {}
    };

    res = {
      render: jest.fn(),
      redirect: jest.fn()
    };

    jest.clearAllMocks();
  });

  test('Deve autenticar o usuário com sucesso (Cliente)', async () => {
    TipoUsuario.findOne.mockResolvedValue({ id: 1 });
    Usuario.findOne.mockResolvedValue({
      id_user: 1,
      email: 'teste@teste.com',
      senha: 'senha123',
      id_tipo_usuario: 1
    });

    await controller.autenticar(req, res);

    expect(TipoUsuario.findOne).toHaveBeenCalledWith({ where: { descricao: 'Cliente' } });
    expect(Usuario.findOne).toHaveBeenCalledWith({
      where: {
        email: 'teste@teste.com',
        senha: 'senha123',
        id_tipo_usuario: 1
      }
    });
    expect(req.session.autorizado).toBe(true);
    expect(req.session.usuario).toEqual({
      id_user: 1,
      email: 'teste@teste.com',
      senha: 'senha123',
      id_tipo_usuario: 1
    });
    expect(res.redirect).toHaveBeenCalledWith('/home');
  });

  test('Deve falhar ao autenticar o usuário (usuário não encontrado)', async () => {
    TipoUsuario.findOne.mockResolvedValue({ id: 1 });
    Usuario.findOne.mockResolvedValue(null);

    await controller.autenticar(req, res);

    expect(TipoUsuario.findOne).toHaveBeenCalledWith({ where: { descricao: 'Cliente' } });
    expect(Usuario.findOne).toHaveBeenCalledWith({
      where: {
        email: 'teste@teste.com',
        senha: 'senha123',
        id_tipo_usuario: 1
      }
    });
    expect(req.session.autorizado).toBeUndefined();
    expect(res.render).toHaveBeenCalledWith('loginConsumidor.html', { erro_autenticacao: true });
  });
});
