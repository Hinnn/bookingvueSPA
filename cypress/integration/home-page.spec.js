describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Shows a header', () => {
    cy.get('.vue-title').should('contain', 'Homer for Customer !!');
    cy.get('b > i').should('contain', 'Time for a reservation !!')
    cy.get('tr > :nth-child(1) > :nth-child(2)')
    cy.get('tr > :nth-child(1) > :nth-child(2) > a').should('have.attr', 'href', '#/room')
    cy.get('tr > :nth-child(1) > :nth-child(3)').should('contain', 'the Room page and find your room')
    cy.get('.hero > :nth-child(4)').should('contain', 'This is the homepage of hotelBooking Web app')
  });

  describe('Navigation bar', () => {
    it('Shows the required links', () => {
      cy.get('.navbar').contains('Home')
      cy.get('.navbar-nav:nth-child(1)').within(() => {
        cy.get('.nav-item:first').should('contain', 'Home')
        cy.get('.nav-item:nth-child(2)').should('contain', 'Room')
        cy.get('.nav-item:nth-child(3)').should('contain', 'Bookings')
        cy.get('.nav-item:nth-child(4)').should('contain', 'Book')
      })
      cy.get('.navbar-nav:nth-child(2)').within(() => {
        cy.get('.nav-item:first').should('contain', 'SignUp')
        cy.get('.nav-item:nth-child(2)').should('contain', 'About')
        cy.get('.nav-item:nth-child(3)').should('contain', 'Contact')
      })
    })

    it('Redirects when links are clicked', () => {
      // cy.get('[data-test=bookbtn]').click();
      // cy.get('.navbar').contains('Book').click();
      // cy.url().should('include', '/book')
      cy.get('.navbar').contains('Room').click()
      cy.url().should('include', '/room')
      cy.get('.navbar').contains('Manage').click()
      cy.url().should('include', '/bookings')
      cy.get(':nth-child(4) > .nav-link > .fa').click()
      cy.url().should('include', '/book')
    });
  })
});
