var personals = angular.module('WunderlistServices').factory('personals', ['$http', function ($http) {
    return {
        user: '',
        init: function () {

        },
        register: function (data) {
            return $http.post('/register', data);
        },
        authorization: function (data) {
            return $http.post('/authorization', data);
        },
        hasAuth: function () {
            return $http.get('/lists');
        },
        logout: function () {
            return $http.get('/logout');
        },
        update: function (id, name, password) {
            return $http.put('/user?id=' + id + '&name=' + name + '&password=' + password);
        }
    };
}]);

module.exports = personals;