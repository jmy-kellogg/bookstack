app.controller('BookCtrl', function($scope, BookFactory, CartFactory, $stateParams) {

    BookFactory.getOne($stateParams.bookId)
    .then(book => {
        $scope.book = book;
        $scope.cover_url = $scope.book.cover_url || 'https://images-na.ssl-images-amazon.com/images/I/51d6mJO92yL._SX327_BO1,204,203,200_.jpg'
    });

    CartFactory.getItemsFromCart()
	.then(function(cartItems){
		var total = 0, tax = 0;
		cartItems.forEach(function(item) {
			total += item.line_item.quantity * parseFloat(item.line_item.unit_price);
		})
		$scope.subTotal = total.toFixed(2);
		tax = total * 0.08;
		$scope.tax = tax.toFixed(2);
		$scope.total = (total + tax).toFixed(2);
		$scope.cartItems = cartItems;
	})

    $scope.addToCart = function(){
		var chosenBookType = $scope.book.book_types.filter(function(instance) {
			return instance.type === document.getElementById('radio-list').elements['inputWalls'].value;
		})[0];
		CartFactory.addToCart(chosenBookType)
		.then(function(){
			return CartFactory.getItemsFromCart()
			.then(function(cartItems){
				$scope.cartItems = cartItems;
			})
		});
		//console.log(document.getElementById('radio-list').elements['inputWalls'].value)
    };

});

