const controller = require('../../src/controller/estabelecimentoController'); 

describe('Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = {
      render: jest.fn()
    };
  });

  test('indexView - Deve renderizar a página index.html', () => {
    controller.indexView(req, res);

    expect(res.render).toHaveBeenCalledWith('index.html');
  });
});
