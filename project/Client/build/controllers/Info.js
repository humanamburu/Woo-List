var Info = angular.module('WunderlistControllers').controller('Info', ['$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location', function ($scope, personals, lists, $state, $stateParams, tasks, $location) {
    $scope.task = {};

    $scope.newSubtask = {
        name: '',
        done: false
    };
    $scope.close = function () {
        $location.path('/lists/' + $stateParams.list);
    };

    tasks.getSingle($stateParams.task)
        .success(function (res) {
            $scope.task = res.task;
            $scope.task.subtasks = res.subtasks;
            $scope.task.date = new Date($scope.task.date);

        });

    $scope.updateDate = function () {
        tasks.updateDate($scope.task._id, $scope.task.date);
    };

    $scope.addSubtask = function () {
        if ($scope.newSubtask.name != '') {
            tasks.addSubtask({
                taskId: $scope.task._id,
                name: $scope.newSubtask.name,
                done: false
            }).success(function (res) {
                $scope.task.subtasks.push(res);
                $scope.newSubtask.name = '';
            });
        }

    };

    $scope.toggle = function (subtask) {
        tasks.toggleSubtask(subtask._id)
            .success(function () {
                subtask.done = !subtask.done;
            })

    };

    $scope.deleteSubtask = function (id) {
        tasks.deleteSubtask(id)
            .success(function () {
                for (var i = 0; i < $scope.task.subtasks.length; i++) {
                    if ($scope.task.subtasks[i]._id === id) {
                        $scope.task.subtasks.splice(i, 1);
                        break;
                    }
                }
            });

    };

    $scope.saveDescription = function (id) {
        tasks.updateTask(false, id, $scope.task.description);
    };

}]);

module.exports = Info;