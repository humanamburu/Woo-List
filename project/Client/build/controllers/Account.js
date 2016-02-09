var Account = angular.module('WunderlistControllers').controller('Account', ['$scope', 'personals', '$modal', '$alert', '$location', '$state', function ($scope, personals, $modal, $alert, $location, $state) {

    $scope.newUser = {
        name: "",
        email: "",
        password: "",
        subPassword: ""
    };
    $scope.authUser = {
        username: "",
        password: ""
    };

    $scope.clearNewUser = function () {
        $scope.newUser.name = "";
        $scope.newUser.email = "";
        $scope.newUser.password = "";
        $scope.newUser.subPassword = "";
    };

    var RegModal = $modal({
        scope: $scope,
        templateUrl: 'templates/modals/registration-modal.tmpl.html',
        show: false,
        animation: 'am-fade-and-slide-top'
    });

    var AuthModal = $modal({
        scope: $scope,
        templateUrl: 'templates/modals/auth-modal.tmpl.html',
        show: false,
        animation: 'am-fade-and-slide-top'
    });

    $scope.showRegModal = function () {
        $state.go('index.reg');
        RegModal.$promise.then(RegModal.show);
    };

    $scope.showAuthModal = function () {
        $state.go('index.auth');
        AuthModal.$promise.then(AuthModal.show);
    };

    if($location.path() === '/index/reg') {
        $scope.showRegModal();
    }
    if($location.path() === '/index/auth') {
        $scope.showAuthModal();
    }
    $scope.registration = function () {
        var error, success;
        if ($scope.newUser.name === "" || $scope.newUser.email === "" || $scope.newUser.password === "" || $scope.newUser.subPassword === "") {
            error = $alert({
                title: 'Error! ',
                content: 'Fill all Inputs!',
                placement: 'top',
                type: 'danger',
                show: true,
                container: 'bs-alert',
                animation: 'am-flip-x',
                duration: 2
            });
        } else if ($scope.newUser.password != $scope.newUser.subPassword) {
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
        } else {
            personals.register($scope.newUser)
                .success(function () {
                    RegModal.$promise.then(RegModal.hide);
                    $scope.clearNewUser();
                    success = $alert({
                        title: 'Success!',
                        content: 'Excellent! Now, Sign-in :)',
                        animation: 'am-flip-x',
                        type: 'success success-center',
                        show: true,
                        duration: 3
                    });
                    $state.go('index');
                })
                .error(function () {
                    error = $alert({
                        title: 'Error! ',
                        content: 'Incorrect email, password or name. Try again.',
                        placement: 'top',
                        type: 'danger',
                        show: true,
                        container: 'bs-alert',
                        animation: 'am-flip-x',
                        duration: 2
                    });
                });
        }

    };

    $scope.auth = function () {
        var error;
        personals.authorization($scope.authUser)
            .success(function (res) {
                personals.user = res;
                AuthModal.$promise.then(AuthModal.hide);
                $location.path('/lists');
            })
            .error(function () {
                error = $alert({
                    title: 'Error! ',
                    content: 'Incorrect email or password. Try again.',
                    placement: 'top',
                    type: 'danger',
                    show: true,
                    container: 'bs-alert',
                    animation: 'am-flip-x',
                    duration: 2
                });
            });
    };

}]);

module.exports = Account;