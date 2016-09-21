app.factory('UserFactory', function($http, $log) {
    var getData = function(res) {
        return res.data;
    };
    return {
        getOne: function(userId) {
            return $http.get('/api/users/' + userId)
                .then(getData)
                .catch($log)
        },
        getAll: function() {
            return $http.get('/api/users/')
                .then(getData)
                .catch($log)
        },
        createUser: function(newUser) {
            return $http.post('/api/users/', newUser)
                .then(getData)
                .catch($log)
        },
        updateUser: function(userId, User) {
            return $http.put('/api/users/' + userId, User)
                .then(getData)
                .catch($log)
        },
        deleteUser: function(userId) {
            return $http.delete('/api/users/' + userId)
                .then(getData)
                .catch($log)
        },
        addAddress: function(addressInfo, type) {
            return $http.post('/api/users/address', {addressInfo, type})
                .then(getData)
                .catch($log);
        }
    }
});
