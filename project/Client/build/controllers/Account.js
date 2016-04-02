const angular = require('angular');
const modals = require('../configFactory/modals');
const alerts = require('../configFactory/alerts');

/* eslint-disable no-param-reassign, max-len */
const Account = angular.module('WunderlistControllers').controller('Account', [
  '$scope', 'personals', '$modal', '$alert', '$location', '$state',
  ($scope, personals, $modal, $alert, $location, $state) => {
    $scope.newUser = {
      name: '',
      email: '',
      password: '',
      subPassword: '',
    };

    $scope.authUser = {
      username: '',
      password: '',
    };

    $scope.clearNewUser = function clearNewUser() {
      $scope.newUser.name = '';
      $scope.newUser.email = '';
      $scope.newUser.password = '';
      $scope.newUser.subPassword = '';
    };

    const RegModal = $modal(modals.registrationModal($scope));
    const AuthModal = $modal(modals.authorizationModal($scope));

    $scope.showRegModal = function showRegModal() {
      $state.go('index.reg');
      RegModal.$promise.then(RegModal.show);
    };

    $scope.showAuthModal = function showAuthModal() {
      $state.go('index.auth');
      AuthModal.$promise.then(AuthModal.show);
    };

    if ($location.path() === '/index/reg') {
      $scope.showRegModal();
    }
    if ($location.path() === '/index/auth') {
      $scope.showAuthModal();
    }

    $scope.registration = function registration() {
      const user = $scope.newUser;
      if (user.name === '' || user.email === '' || user.password === '' || user.subPassword === '') {
        $alert(alerts.fillAllInputs($scope));
      } else if (user.password !== user.subPassword) {
        $alert(alerts.notIdentPasswords($scope));
      } else {
        personals.register($scope.newUser)
            .success(() => {
              RegModal.$promise.then(RegModal.hide);
              $scope.clearNewUser();
              $alert(alerts.succesReg());
              $state.go('index');
            })
            .error(() => {
              $alert(alerts.wrongData());
            });
      }
    };

    $scope.auth = function auth() {
      personals.authorization($scope.authUser)
        .success((res) => {
          personals.user = res;
          AuthModal.$promise.then(AuthModal.hide);
          $location.path('/lists');
        })
        .error(() => {
          $alert(alerts.wrongData());
        });
    };
  }
]);

module.exports = Account;
