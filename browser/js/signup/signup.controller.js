app.controller('signUpController', function($scope, $state, signUpFactory) {
    $scope.signUpSubmit = function() {
        signUpFactory.createUser($scope.signup)
            .then(function() {
                $state.go('login')
            })
    }
    $scope.validSignUp = function() {
        return !!$scope.signup && $scope.signup.password === $scope.confirmPassword
    }
});