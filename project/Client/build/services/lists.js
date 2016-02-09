var lists = angular.module('WunderlistServices').factory('lists', ['$http', 'personals', function ($http, personals) {
    return {
        currentList: '',
        add: function (name) {
            var list = {
                name: name,
                userId: personals.user._id
            };
            return $http.post('/lists', list);
        },
        get: function () {
            return $http.get('/mylists?id=' + personals.user._id);
        },
        delete: function (id) {
            return $http.delete('/mylists?id=' + id);
        }
    };
}]);

module.exports = lists;