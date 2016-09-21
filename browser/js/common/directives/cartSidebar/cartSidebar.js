app.directive('cartSidebar', function($state, CartFactory){

	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/cartSidebar/cartSidebar.html',
		scope: {
			cart: '=',
			showCheckoutBtn: '=',
			total: '=',
			subTotal: '=',
			tax: '='
		},
		link: function(scope) {

			scope.checkout = function(){
				$state.go('checkout');
			};

			scope.removeItem = function(id){
				CartFactory.removeFromCart(id)
				.then(function(){
					CartFactory.getItemsFromCart()
					.then(function(_cart){
						scope.cart = _cart;
						scope.calculate();
					})
				})
			}

			scope.calculate = function(){
				scope.subTotal = scope.cart.reduce(function(curr, next){
					return curr + next.line_item.quantity * parseFloat(next.line_item.unit_price);
				}, 0).toFixed(2);
				scope.tax = (parseFloat(scope.subTotal) * 0.08).toFixed(2);
				scope.total = (parseFloat(scope.subTotal) + parseFloat(scope.tax)).toFixed(2);
			}
		}

	}

});

