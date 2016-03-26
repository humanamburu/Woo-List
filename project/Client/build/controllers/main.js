var services = require('../services/main'),
    ngAnimate = require('angular-animate'),
    charts = require('angular-chart.js');
    ngStrap = require('angular-strap');

var controllers = angular.module('WunderlistControllers', ['WunderlistServices', 'ngAnimate', 'mgcrea.ngStrap', 'chart.js']),
    Account = require('./Account'),
    Lists = require('./Lists'),
    Info = require('./Info'),
    Tasks = require('./Tasks');

module.exports = controllers;
