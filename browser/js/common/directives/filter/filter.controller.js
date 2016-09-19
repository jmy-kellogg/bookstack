'use strict'

app.controller('FilterCtl', function($scope, BookFactory){
	BookFactory.getAll()
	.then(function(books){
		$scope.books = books
	})
})