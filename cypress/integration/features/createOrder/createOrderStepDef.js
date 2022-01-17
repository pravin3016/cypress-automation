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
	cy.wait(3000);
});

Then('verify the product menu, price, quantity', function () {
	Shoppingcart.shoppingCartHeader();
	Shoppingcart.validatePrice();
});

And('check the terms and conditon', function () {
	Shoppingcart.checkTOS().check();
});

And('click on checkout button', function () {
	Shoppingcart.checkoutBtn().click();
	cy.wait(3000);
});

When('checkout as a guest user', function () {
	Shoppingcart.checkoutAsGuestHeader();
	checkout.checkoutGuest().click();
});

Then('verify the ship to same address checkbox', function () {
	checkout.getShipCheckbox().should('have.attr', 'checked');
	checkout.shippingAddressHeader();
});

And('filling the billing, shipping address', function () {
	var firstname = this.testdata.billingAddress.firstname;
	var lastname = this.testdata.billingAddress.lastname;
	var email = this.testdata.billingAddress.email;
	var company = this.testdata.billingAddress.company;
	var country = this.testdata.billingAddress.country;
	var state = this.testdata.billingAddress.state;
	var city = this.testdata.billingAddress.city;
	var addressLine1 = this.testdata.billingAddress.addressLine1;
	var addressLine2 = this.testdata.billingAddress.addressLine2;
	var zipCode = this.testdata.billingAddress.zipCode;
	var phonenNumber = this.testdata.billingAddress.phonenNumber;
	var fax = this.testdata.billingAddress.fax;

	checkout.fillBillingAddress(firstname, lastname, email, company, country, state, city, addressLine1, addressLine2, zipCode, phonenNumber, fax);
});

And('click on continue button', function () {
	checkout.continueBtn().click();
	cy.wait(5000);
});

When('user select shipping method as {string}', function (shippingMethod) {
	//visible and checked verification 
	checkout.groundShippingChecbox().should('be.visible').should('be.checked');
	checkout.airShippingChecbox(shippingMethod).should('be.visible').should('not.be.checked').click();
	checkout.shippingMethodHeader();
});

And('click on continue button from shipping section', function () {
	checkout.shippingContinueBtn().click();

});

And('user select the payment method as {string}', function (paymentmethod) {
	checkout.getMoneyOrderPayment().should('be.visible').should('be.checked');
	checkout.getPaymentMethod(paymentmethod).should('be.visible').should('not.be.checked').click()
	checkout.paymentMethodHeader();
});

And('click on continue button from payment section', function () {
	checkout.paymentContinueBtn().click();
	cy.wait(3000);
});

Then('verify the {string} payment info', function (paymentMethod) {
	checkout.getPaymentInfo(paymentMethod);
	checkout.paymentInfoHeader();
});

When('click on confirm order button', function () {
	checkout.confirmBtn().click();
	cy.wait(3000);
});
Then('verify the order number, success message', function () {
	checkout.getOrderConfirmation().invoke("text").should("eq", "Thank you");
	checkout.getOrderNumMessage().contains('Order number:');
	checkout.confirmPageHeader();
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
	checkout.confirmOrderHeader();

});

And('click on continue button from payment-info section', function () {
	checkout.paymentinfoContinueBtn().click();
	cy.wait(3000);
});