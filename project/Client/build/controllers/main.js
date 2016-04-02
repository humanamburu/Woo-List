/* eslint-disable no-unused-vars*/
const services = require('../services/main');
const ngAnimate = require('angular-animate');
const charts = require('angular-chart.js');
const ngStrap = require('angular-strap');
const ngStrapTpl = require('angular-strap/dist/angular-strap.tpl.js');
const angular = require('angular');

const controllers = angular.module('WunderlistControllers',
  ['WunderlistServices', 'ngAnimate', 'mgcrea.ngStrap', 'chart.js']);

const Account = require('./Account');
const Lists = require('./Lists');
const Info = require('./Info');
const Tasks = require('./Tasks');

module.exports = controllers;
