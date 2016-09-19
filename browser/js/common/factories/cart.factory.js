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
		cartObj.getItemsFromCart()
			.then(function(_cartItems) {
				cartItems = _cartItems;
				cartItems.forEach(function(item){
					total += (item.unit_price * 100) * item.quantity;
				})
				total = total * 1.08; // 8 percent tax
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
				.then(getData);
			})


	};

	return cartObj;

});

