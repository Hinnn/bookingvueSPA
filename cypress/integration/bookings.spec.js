
describe('Manage Bookings page', () => {
  beforeEach(() => {
    // Delete all bookings in the API's datastore
    cy.request('http://localhost:3000/')
      .its('body')
      .then((bookings) => {
        bookings.forEach((element) => {
          cy.request('DELETE',
            'http://localhost:3000/' + element.customerID)
        });
      })
    // Populate API's datastore
    cy.fixture('bookings')
      .then((bookings) => {
        bookings.forEach((booking) => {
          cy.request('POST',
            'http://localhost:3000/', booking)
        })
      })
    cy.visit('/')
    // Click Manage Donations navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(2)').click()
  })
  after(function (done) {
    // db.collection("bookingsdb").remove(booking);
    db.collection("bookingsdb").remove({'customerID': {$in: [1000202, 10000323, 10009340, 21000000]}});
    done();
  });

  it('allows a booking to be deleted', () => {
    cy.get('tbody').find('tr').should('have.length', 6)
    // Click trash/delete link of 6th booking in list
    cy.get('tbody').find('tr:nth-child(6)').find('td:nth-child(8)').click()
    // Click confirmation button
    cy.get('button').contains('Delete').click()
    cy.get('tbody').find('tr').should('have.length', 5)
  });
  it("allows a booking to be edited", ()=>{
    cy.get('tbody').find('tr').should('have.length', 6)
    cy.get('tbody').find('tr:nth-child(4)').find('td:nth-child(8)').click()
    cy.url().should('include', '/edit')
    cy.get('#customerID').should('contain', '12837436')
    cy.get('.col-md-6').find(':nth-child(2)').find('.form__input').should('have.length', 1)
    cy.get('.col-md-6').find(':nth-child(6)').find('.btn').click()
    cy.url().should('include', '/bookings')
  })
})
