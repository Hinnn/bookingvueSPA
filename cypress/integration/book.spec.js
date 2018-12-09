// let db = mongoose.connection;
describe('Book page', () => {
  before(() => {
    // Delete all bookings in the API's datastore
    cy.request('http://localhost:3000/bookings')
      .its('body')
      .then((bookings) => {
        bookings.forEach((element) => {
          cy.request('DELETE',
            'http://localhost:3000/bookings/' + element.customerID)
        })
      })
    // Populate API's datastore
    cy.fixture('bookings')
      .then((bookings) => {
        bookings.forEach((booking) => {
          cy.request('POST',
            'http://localhost:3000/bookings/', booking)
        })
      })
  })
  beforeEach(() => {
    cy.visit('#/book')
    // Click Book navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(4)').click()
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
    cy.contains('Thanks for your Booking!').should('exist')
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get(':nth-child(6) > .btn').click()
    cy.contains('Please Fill in the Form Correctly.').should('exist')
    cy.get('.navbar-nav:nth-child(1)').find('.nav-item:nth-child(4)').click()
    cy.get('#paymenttype').select('Direct')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(111111)
    cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type(20181226)
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(1)
    cy.get('#roomNum').select('303')
    cy.get('.error').should('not.exist')
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Thanks for your Booking!').should('exist')
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })
})
