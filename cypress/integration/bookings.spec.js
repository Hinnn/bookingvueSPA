
describe('Manage Bookings page', () => {
  beforeEach(() => {
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
    cy.visit('/')
    // Click Manage Bookings navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(3)').click()
  })

  it('allows a booking to be deleted', () => {
    cy.get('tbody').find('tr').should('have.length', 3)
    // Click trash/delete link of 1st booking in list
    cy.get('tbody').find('tr:nth-child(3)').find('td:nth-child(8)').click()
    // Click confirmation button
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 2)
  })
  it('allows a booking to be edited', () => {
    cy.get('tbody').find('tr').should('have.length', 3)
    cy.get('tbody').find('tr:nth-child(2)').find('td:nth-child(7)').click()
    cy.url().should('include', '/edit')
    cy.get('#paymenttype').select('Visa')
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').clear()
    cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(2)
    cy.get('#roomNum').select('102')
    cy.get('.error').should('not.exist')
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.contains('Thanks for your Booking!').should('exist')
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })
})
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
          // 'http://YueWang:bookings999@ds135179.mlab.com:35179/bookings/' + element.customID)
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
  })
  it('should turn to the list page', () => {
    // cy.get('.navbar-nav:nth-child(1)').find('.nav-item:nth-child(4)').click()
    // cy.get('#paymenttype').select('Direct')
    // cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').type(111111)
    // cy.get('.col-md-6').find(':nth-child(3)').find('.form__input').type(20181226)
    // cy.get('.col-md-6').find(':nth-child(4)').find('.form__input').type(1)
    // cy.get('#roomNum').select('303')
    // cy.get('.error').should('not.exist')
    // cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    // cy.contains('Thanks for your Booking!').should('exist')
    cy.get('.col-md-6').find(':nth-child(7)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })
})

