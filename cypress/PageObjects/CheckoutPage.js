class CheckoutPage {

	elements = {
		firstName: () => cy.get('#BillingNewAddress_FirstName'),
		lastName: () => cy.get('#BillingNewAddress_LastName'),
		email: () => cy.get('#BillingNewAddress_Email'),
		company: () => cy.get('#BillingNewAddress_Company'),
		country: () => cy.get('#BillingNewAddress_CountryId'),
		state: () => cy.get('#BillingNewAddress_StateProvinceId'),
		city: () => cy.get('#BillingNewAddress_City'),
		address1: () => cy.get('#BillingNewAddress_Address1'),
		address2: () => cy.get('#BillingNewAddress_Address2'),
		postalcode: () => cy.get('#BillingNewAddress_ZipPostalCode'),
		phoneNumber: () => cy.get('#BillingNewAddress_PhoneNumber'),
		faxNumber: () => cy.get('#BillingNewAddress_FaxNumber'),
		// Credit card loactors
		creditCard: () => cy.get('#CreditCardType'),
		cardHolderName: () => cy.get('#CardholderName'),
		cardNumber: () => cy.get('#CardNumber'),
		month: () => cy.get('#ExpireMonth'),
		year: () => cy.get('#ExpireYear'),
		cardcode: () => cy.get('#CardCode')

	}
	shippingAddressHeader() {
		cy.url().should('include', '/onepagecheckout#opc-billing');
	}
	shippingMethodHeader() {
		cy.url().should('include', '/onepagecheckout#opc-shipping_method');
	}
	paymentMethodHeader() {
		cy.url().should('include', '/onepagecheckout#opc-payment_method');
	}
	paymentInfoHeader() {
		cy.url().should('include', '/onepagecheckout#opc-payment_info');
	}
	confirmPageHeader() {
		cy.url().should('include', '/checkout/completed');
	}
	confirmOrderHeader() {
		cy.url().should('include', '/onepagecheckout#opc-confirm_order');
	}
	checkoutGuest() {
		cy.get('.checkout-as-guest-button').click();
		cy.wait(3000);
	}
	continueBtn() {
		cy.get("button[name='save']").eq(0).click();
		cy.wait(5000);
	}
	shippingContinueBtn() {
		cy.get('.shipping-method-next-step-button').click();
	}
	paymentContinueBtn() {
		cy.get('.payment-method-next-step-button').click();
		cy.wait(3000);
	}
	paymentinfoContinueBtn() {
		cy.get('.payment-info-next-step-button').click();
		cy.wait(3000)
	}
	getShipCheckbox() {
		return cy.get('#ShipToSameAddress');
	}
	airShippingChecbox(shippingMethod) {
		return cy.get(`input[value='${shippingMethod}']`)
	}
	groundShippingChecbox() {
		return cy.get('#shippingoption_0')
	}
	getPaymentMethod(paymentMethod) {
		return cy.get(`input[value='${paymentMethod}']`)
	}
	getMoneyOrderPayment() {
		return cy.get(`input[value='Payments.CheckMoneyOrder']`)
	}
	getPaymentInfo(paymentMethod) {

		if (paymentMethod == 'Payments.Manual') {
			cy.fixture("testdata").then((cardData) => {
				this.elements.creditCard().type(cardData.cardDetails.creditCard);
				this.elements.cardHolderName().type(cardData.cardDetails.cardHolderName);
				this.elements.cardNumber().type(cardData.cardDetails.cardNumber);
				this.elements.month().select(cardData.cardDetails.month);
				this.elements.year().select(cardData.cardDetails.year);
				this.elements.cardcode().type(cardData.cardDetails.cardcode);
			});

		} else {
			cy.get('p').contains("Mail Personal or Business Check, Cashier's Check or money order to:");
		}

	}
	getOrderConfirmation() {
		return cy.get('h1');
	}
	fillBillingAddress(firstName, lastName, email, company, country, state, city, addressLine1, addressLine2, zipCode, phonenNumber, fax) {
		this.elements.firstName().type(firstName);
		this.elements.lastName().type(lastName);
		this.elements.email().type(email);
		this.elements.company().type(company);
		this.elements.country().select(country);
		cy.wait(3000);
		this.elements.state().select(state);
		this.elements.city().type(city);
		this.elements.address1().type(addressLine1);
		this.elements.address2().type(addressLine2);
		this.elements.postalcode().type(zipCode);
		this.elements.phoneNumber().type(phonenNumber);
		this.elements.faxNumber().type(fax);
	}
	getOrderPrice() {
		// validating the price
		return cy.get(".value-summary > strong")
	}
	getOrderNumMessage() {
		return cy.get('div.order-number > strong')
	}
	confirmBtn() {
		cy.get(".confirm-order-next-step-button").click();
		cy.wait(3000);
	}
	getShippingInfo() {
		return cy.get('div.shipping-info > ul >li')
	}
	getBackBtn() {
		return cy.get('a[href*="#"]')
	}

}
export default CheckoutPage
