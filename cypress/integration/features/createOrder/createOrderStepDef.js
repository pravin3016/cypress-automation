/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="Cypress"/>

import {
  Then, And, Given, When,
} from 'cypress-cucumber-preprocessor/steps';
import CheckoutPage from '../../../PageObjects/CheckoutPage';
import HomePage from '../../../PageObjects/HomePage';
import SearchResultPage from '../../../PageObjects/SearchResultPage';
import ShoppingCartPage from '../../../PageObjects/ShoppingCartPage';

// Use the cy.fixture() method to pull data from fixture file
before(function () {
  cy.fixture('testdata').then((testdata) => {
    this.testdata = testdata;
  });
});

const Home = new HomePage();
const Search = new SearchResultPage();
const Shoppingcart = new ShoppingCartPage();
const checkout = new CheckoutPage();

Given('launch the nopcommerce site', () => {
  cy.visit('/');
  cy.title().should('eq', 'nopCommerce demo store');
});

And('search the {string} and click on search button', (product) => {
  cy.openiframe();
  Home.searchInput().type(product);
  Home.clickSearchBtn();
});

And('add an item to the cart', () => {
  Search.addToCartBtn();
});

Then('verify the adding cart message', () => {
  cy.get('p').invoke('text').should('eq', 'The product has been added to your shopping cart');
});

When('go to the shopping cart page', () => {
  Search.shoppingCartLink();
});

Then('verify the product menu, price, quantity', () => {
  Shoppingcart.shoppingCartHeader();
  Shoppingcart.validatePrice();
});

And('check the terms and conditon', () => {
  Shoppingcart.checkTOS().check();
});

And('click on checkout button', () => {
  Shoppingcart.checkoutBtn();
});

When('checkout as a guest user', () => {
  Shoppingcart.checkoutAsGuestHeader();
  checkout.checkoutGuest();
});

Then('verify the ship to same address checkbox', () => {
  checkout.getShipCheckbox().should('have.attr', 'checked');
  checkout.shippingAddressHeader();
});

And('filling the billing, shipping address', function () {
  const {
    firstname,
    lastname,
    email,
    company,
    country,
    state,
    city,
    addressLine1,
    addressLine2,
    zipCode,
    phonenNumber,
    fax,
  } = this.testdata.billingAddress;

  checkout.fillBillingAddress(
    firstname,
    lastname,
    email,
    company,
    country,
    state,
    city,
    addressLine1,
    addressLine2,
    zipCode,
    phonenNumber,
    fax,
  );
});

And('click on continue button', () => {
  checkout.continueBtn();
});

When('user select shipping method as {string}', (shippingMethod) => {
  // visible and checked verification
  checkout.groundShippingChecbox().should('be.visible').should('be.checked');
  checkout.airShippingChecbox(shippingMethod).should('be.visible').should('not.be.checked').click();
  checkout.shippingMethodHeader();
});

And('click on continue button from shipping section', () => {
  checkout.shippingContinueBtn();
});

And('user select the payment method as {string}', (paymentmethod) => {
  checkout.getMoneyOrderPayment().should('be.visible').should('be.checked');
  checkout.getPaymentMethod(paymentmethod).should('be.visible').click();
  checkout.paymentMethodHeader();
});

And('click on continue button from payment section', () => {
  checkout.paymentContinueBtn();
});

Then('verify the {string} payment info', (paymentMethod) => {
  checkout.getPaymentInfo(paymentMethod);
  checkout.paymentInfoHeader();
});

When('click on confirm order button', () => {
  checkout.confirmBtn();
});

And('check the order number, success message', () => {
  checkout.getOrderConfirmation().invoke('text').should('eq', 'Thank you');
  checkout.getOrderNumMessage().contains('Order number:');
});

And('verify the shipping address details, price', function () {
  checkout.getShippingInfo().each(($el, index) => {
    expect($el).to.contain(this.testdata.shippingAddress[index]);
  });
  checkout.getOrderPrice()
    .should(($total) => {
      expect($total).to.contain('$490.00');
    });
  checkout.confirmOrderHeader();
});

And('click on continue button from payment-info section', () => {
  checkout.paymentinfoContinueBtn();
});

Then('verify the order checkout header', () => {
  cy.url().should('include', '/checkout/completed');
});
