class HomePage {

	searchInput() {
		return cy.get('#small-searchterms');
	}
	searchBtn() {
		return cy.get('.search-box-button[type=submit]');
	}

}
export default HomePage