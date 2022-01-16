class SearchResultPage {

    addToCartBtn() {
        return cy.get('.button-2.product-box-add-to-cart-button');
    }
    shoppingCartLink() {
        cy.get("#topcartlink > a > span.cart-label");
        return cy.wait(5000);
    }

}
export default SearchResultPage