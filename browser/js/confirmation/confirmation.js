app.config(function ($stateProvider) {
    $stateProvider.state('confirmation', {
        url: '/confirmation/:invoiceId',
        templateUrl: 'js/confirmation/confirmation.html',
        controller: 'ConfirmationCtrl',
        resolve: {
        	invoiceData: function($stateParams, InvoiceFactory){
        		return InvoiceFactory.getInvoice($stateParams.invoiceId);
        	}
        }
    });
});

app.controller('ConfirmationCtrl', function($scope, invoiceData) {

	$scope.invoice = invoiceData.invoice;
	$scope.cartItems = invoiceData.cartItems;

	console.log(invoiceData)

	$scope.calculate = function(){
		$scope.subTotal = $scope.cartItems.reduce(function(curr, next){
			return curr + next.line_item.quantity * parseFloat(next.line_item.unit_price);
		}, 0).toFixed(2);
		$scope.tax = (parseFloat($scope.subTotal) * 0.08).toFixed(2);
		$scope.total = (parseFloat($scope.subTotal) + parseFloat($scope.tax)).toFixed(2);
	}
	$scope.calculate();
});
