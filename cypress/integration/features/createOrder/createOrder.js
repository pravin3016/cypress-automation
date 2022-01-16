/// <reference types="Cypress"/>

import { Then, And, Given, When } from 'cypress-cucumber-preprocessor/steps';
import CheckoutPage from '../../../PageObjects/CheckoutPage';
import HomePage from '../../../PageObjects/homePage';

import SearchResultPage from '../../../PageObjects/searchResultpage';
import ShoppingCartPage from '../../../PageObjects/ShoppingCartPage';

//Use the cy.fixture() method to pull data from fixture file
before(function () {
	cy.fixture('testdata').then(function (testdata) {
		this.testdata = testdata;
	})
})

const Home = new HomePage();
const Search = new SearchResultPage();
const Shoppingcart = new ShoppingCartPage();
const checkout = new CheckoutPage();

Given('launch the nopcommerce site', function () {
	cy.visit('/');
	cy.title().should('eq', 'nopCommerce demo store')
});

And('search the {string} and click on search button', function (product) {
	cy.openiframe();
	Home.searchInput().type(product);
	Home.searchBtn().click();
});

And('add an item to the cart', function () {
	Search.addToCartBtn().click();
});

Then('verify the adding cart message', function () {
	cy.get('p').invoke("text").should("eq", "The product has been added to your shopping cart");
});

When('go to the shopping cart page', function () {
	Search.shoppingCartLink().click();
	cy.wait(5000);
});

Then('verify the product menu, price, quantity', function () {
	Shoppingcart.validatePrice();
});

And('check the terms and conditon', function () {
	Shoppingcart.checkTOS().check();
});

And('click on checkout button', function () {
	Shoppingcart.checkoutBtn().click();
});

When('checkout as a guest user', function () {
	checkout.checkoutGuest().click();
});

Then('verify the ship to same address checkbox', function () {
	checkout.getShipCheckbox().should('have.attr', 'checked');
});

And('filling the billing, shipping address', function () {
	checkout.elements.firstName().type(this.testdata.billingAddress.firstname);
	checkout.elements.lastName().type(this.testdata.billingAddress.lastname);
	checkout.elements.email().type(this.testdata.billingAddress.email);
	checkout.elements.company().type(this.testdata.billingAddress.company);
	checkout.elements.country().select(this.testdata.billingAddress.country);
	cy.wait(3000);
	checkout.elements.state().select(this.testdata.billingAddress.state);
	checkout.elements.city().type(this.testdata.billingAddress.city);
	checkout.elements.address1().type(this.testdata.billingAddress.addressLine1);
	checkout.elements.address2().type(this.testdata.billingAddress.addressLine2);
	checkout.elements.postalcode().type(this.testdata.billingAddress.zipCode);
	checkout.elements.phoneNumber().type(this.testdata.billingAddress.phonenNumber);
	checkout.elements.faxNumber().type(this.testdata.billingAddress.fax);
});

And('click on continue button', function () {

	checkout.continueBtn().click();
	cy.wait(5000);
});

When('user select shipping method as {string}', function (shippingMethod) {
	//visible and checked verification 
	checkout.groundShippingChecbox().should('be.visible').should('be.checked');
	checkout.airShippingChecbox(shippingMethod).should('be.visible').should('not.be.checked').click();

});

And('click on continue button from shipping section', function () {
	checkout.shippingContinueBtn().click();
	cy.wait(5000);
});

And('user select the payment method as {string}', function (paymentmethod) {
	checkout.getMoneyOrderPayment().should('be.visible').should('be.checked');
	checkout.getPaymentMethod(paymentmethod).should('be.visible').should('not.be.checked').click()
});

And('click on continue button from payment section', function () {
	checkout.paymentContinueBtn().click();
	cy.wait(3000);
});

Then('verify the {string} payment info', function (paymentMethod) {
	checkout.getPaymentInfo(paymentMethod);
});

When('click on confirm order button', function () {
	checkout.confirmBtn().click();
	cy.wait(3000);
});
Then('verify the order number, success message', function () {
	checkout.getOrderConfirmation().invoke("text").should("eq", "Thank you");
	checkout.getOrderNumMessage().contains('Order number:');
	cy.wait(3000);

});

And('verify the shipping address details, price', function () {
	checkout.getShippingInfo().each(($el, index) => {
		expect($el).to.contain(this.testdata.shippingAddress[index])
	})
	checkout.getOrderPrice()
		.should(($total) => {
			expect($total).to.contain('$490.00')
		})

});

And('click on continue button from payment-info section', function () {
	checkout.paymentinfoContinueBtn().click();
	cy.wait(3000);
});