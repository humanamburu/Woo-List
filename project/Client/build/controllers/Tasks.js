var Tasks = angular.module('WunderlistControllers').controller('Tasks', ['$modal', '$scope', 'personals', 'lists', '$state', '$stateParams', 'tasks', '$location',
    function($modal, $scope, personals, lists, $state, $stateParams, tasks, $location) {
        lists.currentList = $stateParams.list;
        $scope.visibility = true;
        $scope.tasks = [];
        $scope.newTask = {
            name: ''
        };
        $scope.now = new Date();
        $scope.hurry_up = true;
        
        $scope.pieData = [
            [3, 5, 20],
            [30, 20, 30],
            [280, 5, 40]
        ];
        $scope.pieLabels = ['Просроченые', 'Активные', 'Выполненые'];

        $scope.current = $location.path().slice(32);

        $scope.updateSelected = function(id) {
            $scope.current = id;
        };

        tasks.get().success(function(res) {
            $scope.tasks = res;
            $scope.tasks.map(function(item) {
                item.date = new Date(item.date);
            });
            console.log($scope.tasks);
        });

        $scope.updateTask = function(task) {

            tasks.updateTask(true, task._id)
                .success(function() {
                    task.done = !task.done;
                });

        };

        $scope.addTask = function() {
            if ($scope.newTask.name != '') {
                tasks.add($scope.newTask.name)
                    .success(function(res) {
                        $scope.tasks.push(res);
                        $scope.newTask.name = '';
                    });
            }

        };


        $scope.deleteTask = function(id) {
            tasks.delete(id)
                .success(function() {
                    for (var i = 0; i < $scope.tasks.length; i++) {
                        if ($scope.tasks[i]._id === id) {
                            $scope.tasks.splice(i, 1);
                            break;
                        }
                    }

                });
        }

        var PieChartModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modals/pie-chart.tmpl.html',
            show: false
        });


        $scope.showPieChartModal = function() {
            PieChartModal.$promise.then(PieChartModal.show);
        };

    }
]);

module.exports = Tasks;
