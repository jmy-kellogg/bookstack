app.directive('searchBox', function ($state, $rootScope) {
    return {
        restrict: 'E',
        scope: {
        	name: '='
        },
        templateUrl: 'js/common/directives/searchBox/searchBox.html',
    }
});