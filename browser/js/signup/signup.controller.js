app.controller('signUpController', function($scope, $state, UserFactory) {
    $scope.signUpSubmit = function() {
        UserFactory.createUser($scope.signup)
            .then(function() {
                $state.go('login')
            })
    }
    $scope.validSignUp = function() {
        return !!$scope.signup && $scope.signup.password === $scope.confirmPassword
    }
});
