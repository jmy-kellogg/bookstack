app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/templates/admin.html'
    })
    .state('admin.addBook', {
		url: '/addBook',
		templateUrl: '/js/admin/templates/addBook.html',
		controller: 'AddBookCtrl'
    })
    .state('admin.editBook', {
		url: '/editBook',
		templateUrl: '/js/admin/templates/editBook.html',
		controller: 'EditBookCtrl'
    })
    .state('admin.removeBook', {
		url: '/removeBook',
		templateUrl: '/js/admin/templates/removeBook.html'
    });

});
