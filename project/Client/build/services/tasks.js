var tasks = angular.module('WunderlistServices').factory('tasks', ['$http', 'personals', 'lists', function ($http, personals, lists) {
    return {
        add: function (name) {
            var task = {
                name: name,
                userId: personals.user._id,
                listId: lists.currentList
            };
            return $http.post('/task', task);
        },
        get: function () {
            return $http.get('/tasks?id=' + lists.currentList);
        },
        getSingle: function (id) {
            return $http.get('/task?id=' + id);
        },

        delete: function (id) {
            return $http.delete('/task?id=' + id);
        },

        updateTask: function (toggle,id, desc) {
            console.log('/task?id=' + id + '&desc=' + desc + '&toggle=' + toggle);

            return $http.put('/task?id=' + id + '&desc=' + desc + '&toggle=' + toggle);
        },

        updateDate: function (id, date) {
            return $http.put('/task/date?id=' + id + '&date=' + date);
        },
        addSubtask: function (data) {
            return $http.post('/task/subtask', data);
        },
        toggleSubtask: function (id) {
            return $http.put('/task/subtask?id=' + id);
        },
        deleteSubtask: function (id) {
            return $http.delete('/task/subtask?id=' + id);
        }
    };
}]);

module.exports = tasks;