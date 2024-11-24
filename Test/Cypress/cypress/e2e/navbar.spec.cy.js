describe('Testes de Navegação no Plateful', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('Deve carregar a página inicial corretamente', () => {
    cy.contains('Registre e celebre cada sabor da sua jornada culinária!')
      .should('be.visible');
    cy.get('button').contains('Comece já').should('be.visible');
  });

  it('Deve acessar a página de Login de consumidor pela navbar', () => {
    cy.get('a[href="/Login"]').click();
    cy.url().should('include', '/Login');
  });

  it('Deve acessar a página de login de consumidor pelo botão de Comece já', () => {
    cy.contains('button', 'Comece já').click();
    cy.url().should('include', '/Login');
  });
  
  it('Deve ir da pagina de login do consumidor para o login de restaurante', () => {
    cy.visit('http://localhost:8080/login');
    cy.url().should('include', '/login');
    cy.get('form[action="LoginRestaurante"] button.btn.btn-secondary.w-100', {timeout: 10000})
      .should('be.visible') 
      .click();
    cy.url().should('include', '/LoginRestaurante');
  });
  
  it('Deve exibir a imagem ao clicar no botão Sobre da navbar', () => {
    cy.visit('http://localhost:8080');
    cy.get('a[href="#sobre"]').click();
    cy.get('div.div-img img[src="/img/sobre.png"]', { timeout: 10000 })
    .should('be.visible')
    .and('have.attr', 'src', '/img/sobre.png');
  });
  
});
