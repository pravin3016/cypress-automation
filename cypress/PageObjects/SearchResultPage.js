class SearchResultPage {

	addToCartBtn() {
		cy.get('.button-2.product-box-add-to-cart-button').click();
		cy.wait(3000);
	}
	shoppingCartLink() {
		cy.get("#topcartlink > a > span.cart-label").click();
		cy.wait(3000);
	}

}
export default SearchResultPage