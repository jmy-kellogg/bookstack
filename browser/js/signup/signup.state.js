app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/html/index.html',
        controller: 'signUpController'
    });
});
