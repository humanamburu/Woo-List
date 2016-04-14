var tasks = angular.module('WunderlistServices').factory('tasks', ['$http', 'personals', 'lists', function ($http, personals, lists) {
    return {
        add: (name) => {
            const task = {
                name: name,
                userId: personals.user._id,
                listId: lists.currentList
            };
            return $http.post('/task', task);
        },
        get: () => {
            return $http.get('/tasks?id=' + lists.currentList);
        },
        getSingle: (id) => {
            return $http.get('/task?id=' + id);
        },

        delete: (id) => {
            return $http.delete('/task?id=' + id);
        },

        updateTask: (toggle,id, desc) => {
            return $http.put('/task?id=' + id + '&desc=' + desc + '&toggle=' + toggle);
        },

        updateDate: (id, date) => {
            return $http.put('/task/date?id=' + id + '&date=' + date);
        },
        updateImage: (id, image) => {
            return $http.put('/task/image?id=' + id + '&img=' + image);
        },
        addSubtask: (data) => {
            return $http.post('/task/subtask', data);
        },
        toggleSubtask: (id) => {
            return $http.put('/task/subtask?id=' + id);
        },
        deleteSubtask: (id) => {
            return $http.delete('/task/subtask?id=' + id);
        },
        getPieData: (id) => {
            return $http.get('/pieStatistic?id=' + id);
        }
    };
}]);

module.exports = tasks;