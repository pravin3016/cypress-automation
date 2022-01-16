class SearchResultPage {

    addToCartBtn() {
        return  cy.get('.button-2.product-box-add-to-cart-button');
    }
    shoppingCartLink() {
        return  cy.get("#topcartlink > a > span.cart-label");
    }

}
export default SearchResultPage