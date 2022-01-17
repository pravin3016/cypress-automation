class HomePage {
  searchInput() {
    return cy.get('#small-searchterms');
  }

  clickSearchBtn() {
    cy.get('.search-box-button[type=submit]').click();
  }
}
export default HomePage;
