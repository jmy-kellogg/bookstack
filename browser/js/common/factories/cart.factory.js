app.factory('CartFactory', function($http, $log){

	var cartObj = {};

	var getData = function(res) {
		return res.data;
	};

	cartObj.getItemsFromCart = function(){
		return $http.get('/api/cart')
			.then(getData)
			.catch($log);
	};

	cartObj.addToCart = function(bookTypeInfo){
		return $http.post('/api/cart', bookTypeInfo)
			.then(getData)
			.catch($log);
	};

	cartObj.removeFromCart = function(bookTypeId){
		return $http.delete('/api/cart/' + bookTypeId)
			.then(getData)
			.catch($log);
	};

	cartObj.purchaseItemsFromCart = function(stripeToken, lastFour, comment){
		var total = 0;
		var cartItems;
		return cartObj.getItemsFromCart()
			.then(function(_cartItems) {
				cartItems = _cartItems;
				total = cartItems.reduce(function(curr, next){
					return curr + next.line_item.quantity * parseFloat(next.line_item.unit_price);
				}, 0) * 1.08
				return;
			})
			.then(function() {
				return $http.post('/api/payment', {stripeToken, lastFour, total})
				.then(getData);
			})
			.then(function(payment) {
				return $http.post('/api/invoice', {total, payment, comment})
				.then(getData);
			})
			.then(function(invoice) {
				return $http.put('/api/cart', {cartItems, invoice})
				.then(getData)
				.then(function(){
					return invoice;
				})
			})


	};

	return cartObj;

});

