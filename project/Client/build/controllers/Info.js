const angular = require('angular');
const alerts = require('../configFactory/alerts');

/* eslint-disable no-param-reassign, max-len */
const Info = angular.module('WunderlistControllers').controller('Info', [
  '$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location', '$alert',
  ($scope, personals, lists, $state, $stateParams, tasks, $location, $alert) => {
    $scope.task = {};
    $scope.newSubtask = {
      name: '',
      done: false
    };

    $scope.close = function close() {
      $location.path(`/lists/${$stateParams.list}`);
    };

    tasks.getSingle($stateParams.task)
      .success((res) => {
        $scope.task = res.task;
        $scope.task.subtasks = res.subtasks;
        $scope.task.date = new Date($scope.task.date);
      });

    $scope.updateDate = function updateDate() {
      tasks.updateDate($scope.task._id, $scope.task.date);
    };

    $scope.updateImage = function updateImage() {
      tasks.updateImage($scope.task._id, $scope.task.img);
    };

    $scope.addSubtask = function addSubtask() {
      if ($scope.newSubtask.name !== '') {
        tasks.addSubtask({
          taskId: $scope.task._id,
          name: $scope.newSubtask.name,
          done: false
        })
        .success((res) => {
          $scope.task.subtasks.push(res);
          $scope.newSubtask.name = '';
        });
      }
    };

    $scope.toggle = function toggle(subtask) {
      tasks.toggleSubtask(subtask._id)
        .success(() => {
          subtask.done = !subtask.done;
        });
    };

    $scope.deleteSubtask = function deleteSubtask(id) {
      tasks.deleteSubtask(id)
        .success(() => {
          for (let i = 0; i < $scope.task.subtasks.length; i++) {
            if ($scope.task.subtasks[i]._id === id) {
              $scope.task.subtasks.splice(i, 1);
              break;
            }
          }
        });
    };

    $scope.saveDescription = function saveDescription(id) {
      tasks.updateTask(false, id, $scope.task.description)
        .success(() => {
          $alert(alerts.succesDataSave($scope));
        });
    };
  }
]);

module.exports = Info;
