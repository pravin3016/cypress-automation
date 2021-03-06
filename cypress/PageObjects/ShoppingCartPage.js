class ShoppingCartPage {
  validatePrice() {
    cy.get('.product-unit-price').should('contain', '$245.00');
    cy.get('.qty-input').clear().type('2');
    // Update shopping cart
    cy.get('.update-cart-button[name=updatecart]').click();
    // Verify Total  $490.00
    cy.get('.value-summary > strong')
      .should(($total) => {
        expect($total).to.contain('$490.00');
      });
  }

  shoppingCartHeader() {
    cy.url().should('include', '/cart');
  }

  checkoutAsGuestHeader() {
    cy.url().should('include', '/login/checkoutasguest');
  }

  checkTOS() {
    return cy.get('#termsofservice');
  }

  checkoutBtn() {
    cy.get('#checkout').click();
    cy.wait(3000);
  }
}
export default ShoppingCartPage;
