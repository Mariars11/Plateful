const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});


const Usuario = sequelize.define('usuario', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: true
  },
  id_tipo_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  CNPJ: {
    type: Sequelize.STRING,
    allowNull: true
  },
  nome_fantasia: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

describe('Usuario Model', () => {
  beforeAll(async () => {
    await sequelize.sync(); // Cria tabelas no banco em memória
  });

  test('Deve criar uma instância do modelo com os campos corretos', async () => {
    const mockData = {
      email: 'usuario@teste.com',
      senha: 'senha123',
      nome: 'Usuário Teste',
      id_tipo_usuario: 1,
      CNPJ: '12345678901234',
      nome_fantasia: 'Fantasia Teste'
    };

    const instance = Usuario.build(mockData);

    expect(instance.email).toBe(mockData.email);
    expect(instance.senha).toBe(mockData.senha);
    expect(instance.nome).toBe(mockData.nome);
    expect(instance.id_tipo_usuario).toBe(mockData.id_tipo_usuario);
    expect(instance.CNPJ).toBe(mockData.CNPJ);
    expect(instance.nome_fantasia).toBe(mockData.nome_fantasia);
  });

  test('Deve ter as configurações corretas no modelo', () => {
    expect(Usuario.rawAttributes).toHaveProperty('id_user');
    expect(Usuario.rawAttributes.id_user.primaryKey).toBe(true);
    expect(Usuario.rawAttributes.email.allowNull).toBe(false);
    expect(Usuario.rawAttributes.email.unique).toBe(true);
    expect(Usuario.rawAttributes.senha.type.key).toBe('STRING');
    expect(Usuario.rawAttributes.id_tipo_usuario.type.key).toBe('INTEGER');
  });
});
