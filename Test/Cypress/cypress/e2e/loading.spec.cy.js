describe('Página Inicial', () => {
  it('Deve carregar a página principal corretamente', () => {
    cy.visit('http://localhost:8080') 
    cy.get('title').should('contain', 'Plateful')
    cy.get('title').then(() => {
      cy.log('Página inicial carregada com sucesso!') 
    })
  })
})
