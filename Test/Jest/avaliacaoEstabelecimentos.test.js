const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite://:memory:', { logging: false });

const AvaliacaoEstabelecimento = sequelize.define('avaliacaoEstabelecimento', {
  id_avaliacao_estabelecimento: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  avaliacao_usuario: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nota_usuario: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  url_imagem_usuario: {
    type: Sequelize.STRING,
    allowNull: true
  },
  id_estabelecimento: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  data_avaliacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  }
});

describe('AvaliacaoEstabelecimento Model', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  test('Deve criar uma instância do modelo com os campos corretos', async () => {
    const mockData = {
      avaliacao_usuario: 'Ótimo estabelecimento!',
      nota_usuario: 5,
      url_imagem_usuario: 'https://example.com/image.jpg',
      id_estabelecimento: 1,
      id_usuario: 2,
      data_avaliacao: new Date()
    };

    const instance = AvaliacaoEstabelecimento.build(mockData);

    expect(instance.avaliacao_usuario).toBe(mockData.avaliacao_usuario);
    expect(instance.nota_usuario).toBe(mockData.nota_usuario);
    expect(instance.url_imagem_usuario).toBe(mockData.url_imagem_usuario);
    expect(instance.id_estabelecimento).toBe(mockData.id_estabelecimento);
    expect(instance.id_usuario).toBe(mockData.id_usuario);
    expect(instance.data_avaliacao).toStrictEqual(mockData.data_avaliacao);
  });

  test('Deve ter as configurações corretas no modelo', () => {
    expect(AvaliacaoEstabelecimento.rawAttributes).toHaveProperty('id_avaliacao_estabelecimento');
    expect(AvaliacaoEstabelecimento.rawAttributes.id_avaliacao_estabelecimento.primaryKey).toBe(true);

    expect(AvaliacaoEstabelecimento.rawAttributes.nota_usuario.type.key).toBe('TINYINT');
  });
});
