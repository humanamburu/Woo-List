var Lists = angular.module('WunderlistControllers').controller('Lists', ['$scope', 'personals', 'lists', '$state', '$modal', '$alert', '$location', function ($scope, personals, lists, $state, $modal, $alert, $location) {

    personals.init();

    if(personals.user === '') {
        $state.go(index);
    }

    $scope.current = $location.path().slice(7, 31);

    $scope.user = {
        name: personals.user.name,
        password: '',
        subPassword: ''
    };
    $scope.newList = {
        name: ''
    };

    $scope.lists = [];

    lists.get().success(function (res) {
        $scope.lists = res;
    });

    $scope.logout = function () {
        personals.logout()
            .success(function () {
                $state.go('index');
            });
    };

    var newListModal = $modal({
        scope: $scope,
        templateUrl: 'templates/modals/newList-modal.tmpl.html',
        show: false,
        animation: 'am-fade-and-slide-top'
    });

    var settingsModal = $modal({
        scope: $scope,
        templateUrl: 'templates/modals/settings-modal.tmpl.html',
        show: false,
        animation: 'am-fade-and-slide-top'
    });

    $scope.showNewListModal = function () {
        newListModal.$promise.then(newListModal.show);
    };
    $scope.showSettingsModal = function () {
        settingsModal.$promise.then(settingsModal.show);
    };

    $scope.addList = function () {
        lists.add($scope.newList.name)
            .success(function (res) {
                $scope.lists.push(res);
                newListModal.$promise.then(newListModal.hide);
                $scope.newList.name = '';

            })
            .error(function () {

            });
    };

    $scope.updateSelected = function (id) {
        $scope.current = id;
    };

    $scope.deleteList = function (id) {
        lists.delete(id)
            .success(function () {

                //Finding and deleting element from lists
                for (var i = 0; i < $scope.lists.length; i++) {
                    if ($scope.lists[i]._id === id) {
                        $scope.lists.splice(i, 1);
                        break;
                    }
                }

                if(lists.currentList === id) {
                    $state.go('lists');
                }

            });
    };

    $scope.saveSettings = function () {
        var error;
        if ($scope.user.password === $scope.user.subPassword) {
            personals.update(personals.user._id, $scope.user.name, $scope.user.password)
                .success(function () {
                    settingsModal.$promise.then(settingsModal.hide);
                })
                .error(function () {
                    error = $alert({
                        title: 'Error! ',
                        content: 'Incorrect name or email!',
                        placement: 'top',
                        type: 'danger',
                        show: true,
                        container: 'bs-alert',
                        animation: 'am-flip-x',
                        duration: 2
                    });
                })
        } else {
            error = $alert({
                title: 'Error! ',
                content: 'Password and submit password not identical!',
                placement: 'top',
                type: 'danger',
                show: true,
                container: 'bs-alert',
                animation: 'am-flip-x',
                duration: 2
            });
        }


    }

}]);

module.exports = Lists;