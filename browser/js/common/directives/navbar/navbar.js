app.directive('navbar', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Cart', state: 'cart'},
                { label: 'Bookshelf', state: 'bookshelf' },
                { label: 'Checkout', state: 'checkout' },
                { label: 'Search', state: 'search' }, 
                 { label: 'Sign Up', state: 'signup' }
            ];

            scope.user = null;


        }

    };

});
