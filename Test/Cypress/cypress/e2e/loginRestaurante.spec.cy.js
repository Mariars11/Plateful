describe('Testes de Navegação no Plateful - Login de Restaurante', () => {
  it('Deve navegar da página de login do consumidor para o login de restaurante e realizar o login', () => {
    cy.visit('http://localhost:8080/login');
    cy.url().should('include', '/login');

    cy.get('form[action="LoginRestaurante"] button.btn.btn-secondary.w-100', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.url().should('include', '/LoginRestaurante');

    cy.get('input[name="email"]').type('contato@restaurantedeliciaa.com');
    cy.get('input[name="senha"]').type('senhaSegura1233');

    cy.get('button[type="submit"]').click();

    cy.contains('Crie seu estabelecimento').should('be.visible');
  });
});
