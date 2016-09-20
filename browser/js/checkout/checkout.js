app.config(function ($stateProvider) {
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });
});

app.controller('CheckoutCtrl', function($scope, CartFactory, $state){

	$scope.clicked = false;

	$scope.submit = function(){
		console.log($scope.number)
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
				$scope.$digest();
			} else {
				var token = response.id;
				CartFactory.purchaseItemsFromCart(token, $scope.lastFour)
				.then(function(){
					$state.go('search'); // need purchase success landing page;
				});
			}
	    });

	};

});
