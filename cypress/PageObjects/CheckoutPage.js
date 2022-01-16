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
		return cy.get('.checkout-as-guest-button');
	}
	continueBtn() {
		return cy.get("button[name='save']").eq(0);
	}
	shippingContinueBtn() {
		return cy.get('.shipping-method-next-step-button')
	}
	paymentContinueBtn() {
		return cy.get('.payment-method-next-step-button')
	}
	paymentinfoContinueBtn() {
		return cy.get('.payment-info-next-step-button')
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

	validatePaymentCard(paymentMethod) {


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
			cy.get('p').invoke("text").should("eq", "Mail Personal or Business Check, Cashier's Check or money order to:");
		}

	}
	getOrderConfirmation() {
		return cy.get('h1');

	}

	getOrderPrice() {
		// validating the price
		return cy.get(".value-summary > strong")

	}
	getOrderNumMessage() {
		return cy.get('div.order-number > strong')
	}

	confirmBtn() {
		return cy.get(".confirm-order-next-step-button")
	}

	getShippingInfo() {
		return cy.get('div.shipping-info > ul >li')
	}
	getBackBtn() {
		return cy.get('a[href*="#"]')
	}

}
export default CheckoutPage
