app.controller('BookCtrl', function($scope, BookFactory, $stateParams) {
    BookFactory.getOne($stateParams.bookId)
    .then(book => {
        $scope.book = book;
        $scope.cover_url = $scope.book.cover_url || 'https://images-na.ssl-images-amazon.com/images/I/51d6mJO92yL._SX327_BO1,204,203,200_.jpg'
    });

});

