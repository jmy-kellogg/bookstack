app.config(function ($stateProvider) {
    $stateProvider.state('book', {
        url: '/book/:bookId',
        templateUrl: '/js/book/html/index.html',
        controller: 'BookCtrl',
        resolve: {
        	cartItems: function(CartFactory){
        		return CartFactory.getItemsFromCart();
        	}
        }
    })
});
