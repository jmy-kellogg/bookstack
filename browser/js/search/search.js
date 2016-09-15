app.config(function ($stateProvider) {
    $stateProvider.state('search', {
        url: '/search/:result',
        templateUrl: 'js/search/search.html',
        controller: 'SearchCtl'
    });
})
app.controller('SearchCtl', function($scope, $stateParams, BookFactory){
	$scope.searchTerm = $stateParams.result;


})
