@TestFeature
Feature: To place an order

	Testing the order placing flow

	Scenario Outline: Validate the order flow
		Given launch the nopcommerce site
		And search the "<product>" and click on search button
		And add an item to the cart
		Then verify the adding cart message
		When go to the shopping cart page
		Then verify the product menu, price, quantity
		And check the terms and conditon
		And click on checkout button
		When checkout as a guest user
		Then verify the ship to same address checkbox
		And filling the billing, shipping address
		And click on continue button
		When user select shipping method as "<shippingMethod>"
		And click on continue button from shipping section
		And user select the payment method as "<paymentmethod>"
		And click on continue button from payment section
		Then verify the "<paymentmethod>" payment info
		And click on continue button from payment-info section
		And verify the shipping address details, price
		When click on confirm order button
		And check the order number, success message
		Then verify the order checkout header

		Examples:
			| product                           | shippingMethod                               | paymentmethod   |
			| HTC One M8 Android L 5.0 Lollipop | Next Day Air___Shipping.FixedByWeightByTotal | Payments.Manual |
