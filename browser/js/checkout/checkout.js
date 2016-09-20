app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
        	cartItems: function(CartFactory){
        		return CartFactory.getItemsFromCart();
        	}
        }
    });
});

app.controller('CheckoutCtrl', function($scope, CartFactory, UserFactory, $state, cartItems){

	$scope.cartItems = cartItems;
	$scope.clicked = false;

	$scope.calculate = function(){
		$scope.subTotal = $scope.cartItems.reduce(function(curr, next){
			return curr + next.line_item.quantity * parseFloat(next.line_item.unit_price);
		}, 0).toFixed(2);
		$scope.tax = (parseFloat($scope.subTotal) * 0.08).toFixed(2);
		$scope.total = (parseFloat($scope.subTotal) + parseFloat($scope.tax)).toFixed(2);
	}
	$scope.calculate();

	$scope.submit = function(){

		if ($scope.sameAsBilling) {
			$scope.shipping = Object.assign({}, $scope.billing);
		}
		UserFactory.addAddress($scope.billing, 'billing')
		.then(function(){
			return UserFactory.addAddress($scope.shipping, 'shipping');
		})

		$scope.clicked = true;
		$scope.lastFour = $scope.number.slice(-4);

		var stripeData = {
			number: $scope.number,
			exp_month: $scope.exp_month,
			exp_year: $scope.exp_year,
			cvc: $scope.cvc,
			address_zip: $scope.address_zip
		};

	    // Request a token from Stripe:
	    Stripe.card.createToken(stripeData, function(status, response){
			if (response.error) {
				$scope.errorMessage = response.error.message;
				$scope.clicked = false;
			} else {
				var token = response.id;
				CartFactory.purchaseItemsFromCart(token, $scope.lastFour)
				.then(function(invoice){
					$state.go('confirmation', {invoiceId: invoice.id});
				});
			}
	    });

	};

});
