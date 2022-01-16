class ShoppingCartPage {

    validatePrice() {
        cy.get(".product-unit-price").should('contain', '$245.00')  
        cy.get(".qty-input").clear().type('2');
        //Update shopping cart
        cy.get(".update-cart-button[name=updatecart]").click()
        //Verify Total  $490.00
        //cy.get(".value-summary > strong").contains('$490.00')
        cy.get(".value-summary > strong")
          .should(($total)=>{
              expect($total).to.contain('$490.00')
          })
    }

  

    checkTOS() {
        return cy.get('#termsofservice');
    }

    checkoutBtn() {
        return cy.get('#checkout');
    }

}
export default ShoppingCartPage
