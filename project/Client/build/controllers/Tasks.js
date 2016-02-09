var Tasks = angular.module('WunderlistControllers').controller('Tasks', ['$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location', function ($scope, personals, lists, $state, $stateParams, tasks, $location) {
    lists.currentList = $stateParams.list;
    $scope.visibility = true;
    $scope.tasks = [];
    $scope.newTask = {
        name: ''
    };

    $scope.current = $location.path().slice(32);

    $scope.updateSelected = function (id) {
        $scope.current = id;
    };

    tasks.get().success(function (res) {
        $scope.tasks = res;
    });

    $scope.updateTask = function (task) {

        tasks.updateTask(true, task._id)
            .success(function () {
                if (!task.done) {
                    task.done = true;
                } else {
                    task.done = false;
                }
            });

    };

    $scope.addTask = function () {
        if ($scope.newTask.name != '') {
            tasks.add($scope.newTask.name)
                .success(function (res) {
                    $scope.tasks.push(res);
                    $scope.newTask.name = '';
                });
        }

    };


    $scope.deleteTask = function (id) {
        tasks.delete(id)
            .success(function () {
                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i]._id === id) {
                        $scope.tasks.splice(i, 1);
                        break;
                    }
                }

            });
    }


}]);

module.exports = Tasks;