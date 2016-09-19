app.directive('navbar', function () {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '='},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Bookshelf', state: 'bookshelf' },
                { label: 'Browse', state: 'search' },
                { label: 'Sign Up', state: 'signup' },
                { label: 'Log In', state: 'login' },
                { label: 'Admin', state: 'admin' }
            ];

            scope.user = null;


        }

    };

});
