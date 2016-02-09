var services = require('../services/main'),
    ngAnimate = require('../../../../node_modules/angular-animate/angular-animate.js'),
    ngStrap = require('../../../../node_modules/angular-strap/dist/angular-strap.js'),
    ngStrapTpl = require('../../../../node_modules/angular-strap/dist/angular-strap.tpl.js');

var controllers = angular.module('WunderlistControllers', ['WunderlistServices', 'ngAnimate', 'mgcrea.ngStrap']),
    Account = require('./Account'),
    Lists = require('./Lists'),
    Info = require('./Info'),
    Tasks = require('./Tasks');

module.exports = controllers;