app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: '/js/admin/templates/admin.html'
    })
    .state('admin.book', {
		url: '/book',
		templateUrl: '/js/admin/templates/adminBook.html',
		controller: 'AdminBookCtrl'
    })
    .state('admin.author', {
		url: '/author',
		templateUrl: '/js/admin/templates/adminAuthor.html',
		controller: 'AdminAuthorCtrl'
    })
    .state('admin.publisher', {
        url: '/publisher',
        templateUrl: '/js/admin/templates/adminPublisher.html',
        controller: 'AdminPublisherCtrl'
    });

});
