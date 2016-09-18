app.factory('signUpFactory', function($http, $log) {
    var getData = function(res) {
        return res.data;
    };
    return {
        createUser: function(newUser) {
            return $http.post('/api/signup/', newUser)
                .then(getData)
                .catch($log)
        }
    }
});