describe('Testes de Login no Plateful', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.get('a[href="/Login"]').click();
  });

  it('Deve realizar login com sucesso', () => {
    cy.get('input#email').type('joao.silvaaa@example.com'); 
    cy.get('input#senha').type('senha12333'); 
    
    cy.get('button#btn-login').click();

    cy.contains('h3', 'Recomendações').should('be.visible');
  });

});
