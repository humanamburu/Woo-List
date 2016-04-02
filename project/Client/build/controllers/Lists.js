const angular = require('angular');
const alerts = require('../configFactory/alerts');
const modals = require('../configFactory/modals');

/* eslint-disable no-param-reassign, max-len */
const Lists = angular.module('WunderlistControllers').controller('Lists', [
  '$scope', 'personals', 'lists', '$state', '$modal', '$alert', '$location',
  ($scope, personals, lists, $state, $modal, $alert, $location) => {
    personals.init();

    if (personals.user === '') {
      $state.go('index');
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
    $scope.isPasswordChange = false;

    lists.get().success((res) => {
      $scope.lists = res;
    });

    $scope.logout = function logout() {
      personals.logout()
        .success(() => {
          $state.go('index');
        });
    };

    const newListModal = $modal(modals.newListModal($scope));
    const settingsModal = $modal(modals.settingsModal($scope));

    $scope.showNewListModal = function showNewListModal() {
      newListModal.$promise.then(newListModal.show);
    };
    $scope.showSettingsModal = function showSettingsModal() {
      settingsModal.$promise.then(settingsModal.show);
    };

    $scope.addList = function addList() {
      lists.add($scope.newList.name)
        .success((res) => {
          $scope.lists.push(res);
          newListModal.$promise.then(newListModal.hide);
          $scope.newList.name = '';
        })
        .error(() => {

        });
    };

    $scope.updateSelected = function updateSelected(id) {
      $scope.current = id;
    };

    $scope.deleteList = function deleteList(id) {
    //  Finding and deleting element from lists
      lists.delete(id)
            .success(() => {
              for (let i = 0; i < $scope.lists.length; i++) {
                if ($scope.lists[i]._id === id) {
                  $scope.lists.splice(i, 1);
                  break;
                }
              }
              if (lists.currentList === id) {
                $state.go('lists');
              }
            });
    };

    $scope.saveSettings = function saveSettings() {
      if ($scope.user.password === $scope.user.subPassword) {
        personals.update(personals.user._id, $scope.user.name, $scope.user.password)
          .success(() => {
            settingsModal.$promise.then(settingsModal.hide);
          })
          .error(() => {
            $alert(alerts.incorrectNameOrEmail($scope));
          });
      } else {
        $alert(alerts.notIdentPasswords($scope));
      }
    };
  }
]);

module.exports = Lists;
