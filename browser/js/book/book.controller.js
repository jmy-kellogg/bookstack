app.controller('BookCtrl', function($rootScope, $scope, AuthService, BookFactory, CartFactory, $stateParams, cartItems) {
	$scope.reviewToAdd = {};
	$scope.reviewToAdd.stars = 1;

	AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });

    $scope.initialize = function(){
	    BookFactory.getOne($stateParams.bookId)
	    .then(book => {
	        $scope.book = book;
	        $scope.reviews = $scope.book.users;
	        
	        $scope.cover_url = $scope.book.cover_url || 'https://images-na.ssl-images-amazon.com/images/I/51d6mJO92yL._SX327_BO1,204,203,200_.jpg'
	    });
    };
    $scope.initialize();

	$scope.cartItems = cartItems;
	if (cartItems.length) {
		$scope.showCheckout = true;
	}

    $scope.addToCart = function(){
		var chosenBookType = $scope.book.book_types.filter(function(instance) {
			return instance.type === document.getElementById('radio-list').elements['inputWalls'].value;
		})[0];
		CartFactory.addToCart(chosenBookType)
		.then(function(){
			return CartFactory.getItemsFromCart()
			.then(function(_cartItems){
				$scope.cartItems = _cartItems;
				$scope.calculate();
			})
		});
    };

    $scope.calculate = function(){
		$scope.subTotal = $scope.cartItems.reduce(function(curr, next){
			return curr + next.line_item.quantity * parseFloat(next.line_item.unit_price);
		}, 0).toFixed(2);
		$scope.tax = (parseFloat($scope.subTotal) * 0.08).toFixed(2);
		$scope.total = (parseFloat($scope.subTotal) + parseFloat($scope.tax)).toFixed(2);
	}
	$scope.calculate();

	$scope.changeCommentStars = function(num) {
		$scope.reviewToAdd.stars = num;
	}

	$scope.addReview = function() {
		console.log($scope.book.id)
		console.log($scope.reviewToAdd)
		BookFactory.addReview($scope.book.id, $scope.reviewToAdd)
		.then(function() {
			$scope.reviewToAdd = {};
			$scope.reviewToAdd.stars = 1;
			$scope.initialize();
		})
	}

});

