app.directive('navbar', function () {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '='},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Cart', state: 'cart'},
                { label: 'Bookshelf', state: 'bookshelf' },
                { label: 'Checkout', state: 'checkout' },
                { label: 'Search', state: 'search' },
                { label: 'Sign Up', state: 'signup' },
                { label: 'Log In', state: 'login' },
                { label: 'Welcome', state: 'welcome' },
                { label: 'Admin', state: 'admin' }
            ];

            scope.user = null;


        }

    };

});
