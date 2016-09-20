app.directive('filter', function () {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '='},
        templateUrl: 'js/common/directives/filter/filter.html',
        contorller: 'FilterCtl',
        };

});
