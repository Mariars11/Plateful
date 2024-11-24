describe('Testes de Navegação no Plateful - Cadastro de Restaurante', () => {

  it('Deve ir da pagina de login do consumidor para o login de restaurante', () => {
    cy.visit('http://localhost:8080/login');
    cy.url().should('include', '/login');
    cy.get('form[action="LoginRestaurante"] button.btn.btn-secondary.w-100', {timeout: 10000})
      .should('be.visible') 
      .click();
    cy.url().should('include', '/LoginRestaurante');;
    
    cy.get('a[href="/CadastrarRestaurante"]').click();

    cy.get('input[name="nomeFantasia"]').type('Restaurante Delíciaa');
    cy.get('input[name="email"]').type('contato@restaurantedeliciaa.com');
    cy.get('input[name="cnpj"]').type('123456780001900'); 
    cy.get('input[name="senha"]').type('senhaSegura1233');


    cy.get('button#btn-cadastro').click();
    
    cy.contains('Restaurante cadastrado com sucesso!').should('be.visible');

  });
});
