describe('Testes de Navegação no Plateful - Cadastro de Consumidor', () => {
  
  it('Deve preencher o formulário de cadastro e submeter com sucesso', () => {
    cy.visit('http://localhost:8080/login');
    cy.get('a[href="/Cadastrar"]').click();
    
    cy.url().should('include', '/Cadastrar');

    cy.get('input[name="nome"]').type('João Silvaaa');
    cy.get('input[name="email"]').type('joao.silvaaa@example.com');
    cy.get('input[name="senha"]').type('senha12333');

    cy.get('button[type="submit"]').click();

    cy.contains('Usuário cadastrado com sucesso!').should('be.visible');
  });
});
