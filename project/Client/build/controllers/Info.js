var Info = angular.module('WunderlistControllers').controller('Info', ['$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location', 'Upload', function ($scope, personals, lists, $state, $stateParams, tasks, $location, Upload) {
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


    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.files = [$scope.file];
        }
    });

    $scope.upload = function (file) {
        Upload.upload({
            url: '/file',
            data: {file: file, 'task': $scope.task._id}
        });
    };

}]);

module.exports = Info;