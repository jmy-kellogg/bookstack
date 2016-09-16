app.directive('filter', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '='},
        templateUrl: 'js/common/directives/filter/filter.html',

    };

});