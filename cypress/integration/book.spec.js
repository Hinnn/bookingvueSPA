// let db = mongoose.connection;
describe('Book page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Book navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(4)').click()
  })
  after(() => {
    cy.url().should('include', '/bookings')
    // cy.visit('/bookings')
    // db.collection('bookingsdb').remove({'customerID': {$in: [21000000]}});
    cy.get('tbody').find('tr').should('have.length', 4)
    // Click trash/delete link of 6th booking in list
    cy.get('tbody').find('tr:nth-child(4)').find('td:nth-child(8)').click()
    // Click confirmation button
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 3)
  })

  it('allows a valid booking to be submitted', () => {
    // Fill out web form
    cy.get('#paymenttype').select('Direct')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(21000000)
    cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type(20181201)
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(1)
    cy.get('#roomNum').select('102')
    cy.get('.error').should('not.exist')
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Thanks for your Booking!').should('exist');
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Please Fill in the Form Correctly.').should('exist')
  /* cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(321654)
    cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type(20190105)
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(1)
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Thanks for your Booking!').should('exist'); */
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings') 
  })
})
