app.factory('InvoiceFactory', function($http, $log){

	var invoiceObj = {};

	var getData = function(res) {
		return res.data;
	};

	invoiceObj.getInvoice = function(invoiceId){
		return $http.get('/api/invoice/' + invoiceId)
			.then(getData)
			.catch($log);
	};

	return invoiceObj;

});

