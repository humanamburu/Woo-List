const angular = require('angular');
const modals = require('../configFactory/modals');

/* eslint-disable no-param-reassign, max-len */
const Tasks = angular.module('WunderlistControllers').controller('Tasks', [
  '$modal', '$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location',
  ($modal, $scope, personals, lists, $state, $stateParams, tasks, $location) => {
    lists.currentList = $stateParams.list;
    $scope.visibility = true;
    $scope.tasks = [];
    $scope.newTask = {
      name: '',
    };
    $scope.now = new Date();
    $scope.hurry_up = true;

    //  CHARTS DATA
    $scope.pieData = [
      [3,  5,  20],
      [30, 20, 30],
      [280, 5, 40],
    ];
    $scope.pieLabels = ['Просроченые', 'Активные', 'Выполненые'];
    $scope.lineLabels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.lineSeries = ['Series A', 'Series B'];
    $scope.lineData = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
    ];

    $scope.current = $location.path().slice(32);

    $scope.updateSelected = function updateSelected(id) {
      $scope.current = id;
    };

    tasks.get().success((res) => {
      $scope.tasks = res;
      $scope.tasks.map((item) => {
        item.date = new Date(item.date);
      });
    });
    $scope.updateTask = function updateTask(task) {
      tasks.updateTask(true, task._id)
        .success(() => {
          task.done = !task.done;
        });
    };

    $scope.addTask = function addTask() {
      if ($scope.newTask.name !== '') {
        tasks.add($scope.newTask.name)
            .success((res) => {
              $scope.tasks.push(res);
              $scope.newTask.name = '';
            });
      }
    };
    $scope.deleteTask = function deleteTask(id) {
      tasks.delete(id)
          .success(() => {
            for (let i = 0; i < $scope.tasks.length; i++) {
              if ($scope.tasks[i]._id === id) {
                $scope.tasks.splice(i, 1);
                break;
              }
            }
          });
    };

    const PieChartModal = $modal(modals.pieChartModal($scope));
    const LineChartModal = $modal(modals.lineChartModal($scope));
    $scope.showPieChartModal = function showPieChartModal() {
      PieChartModal.$promise.then(PieChartModal.show);
    };

    $scope.showLineChartModal = function showLineChartModal() {
      LineChartModal.$promise.then(LineChartModal.show);
    };
  }
]);

module.exports = Tasks;
