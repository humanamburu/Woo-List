var Angular = require('../../../node_modules/angular/angular.js'),
    bootstrap = require('./libs/bootstrap.min.js'),
    router = require('../../../node_modules/angular-ui-router/release/angular-ui-router.js'),
    upload = require('../../../node_modules/ng-file-upload/dist/ng-file-upload-all.min.js');

var controllers = require('./controllers/main');
var wunderlist = angular.module('Wunderlist', [router, 'WunderlistControllers', 'ngFileUpload']);
var ngEnter = require('./directives/ngEnter');


wunderlist.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: "templates/index.tmpl.html",
            controller: 'Account',
            authenticate: false
        })
        .state('index.reg', {
            url: "/reg",
            templateUrl: "templates/modals/registration-modal.tmpl.html",
            controller: 'Account',
            authenticate: false
        })
        .state('index.auth', {
            url: "/auth",
            templateUrl: "templates/modals/auth-modal.tmpl.html",
            controller: 'Account',
            authenticate: false

        })
        .state('lists', {
            url: "/lists",
            templateUrl: "templates/lists.tmpl.html",
            controller: 'Lists',
            authenticate: true
        })
        .state('lists.tasks', {
            url: "/:list",
            templateUrl: "templates/tasks.tmpl.html",
            controller: 'Tasks',
            authenticate: true
        })
        .state('lists.tasks.info', {
            url: "/:task",
            templateUrl: "templates/info.tmpl.html",
            controller: 'Info',
            authenticate: true
        })

});

wunderlist.run(['$rootScope', '$state', 'personals', '$location', function ($rootScope, $state, personals, $location) {
    personals.hasAuth()
        .success(function (res) {
            personals.user = res;
            if ($location.path() === '/index') {
                $state.go("lists");
                event.preventDefault();
            }

        })
        .error(function () {
            personals.user = {};
            if ($location.path() != '/index/auth' && $location.path() != '/index/reg') {
                $state.go("index");
                event.preventDefault();
            }
        });

}]);