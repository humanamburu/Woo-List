const Task = require('../../models/Task');
const logger = require('../../logger');

const JAN = 0;
const FEB = 1;
const MAR = 2;
const APR = 3;
const MAY = 4;
const JUN = 5;

function _getStatistic(tasks) {
  const result = [];


  result[JAN] = tasks.filter((item) => {
    return item.date.getMonth() === JAN && item.done;
  }).length;

  result[FEB] = tasks.filter((item) => {
    return item.date.getMonth() === FEB && item.done;
  }).length;

  result[MAR] = tasks.filter((item) => {
    return item.date.getMonth() === MAR && item.done;
  }).length;

  result[APR] = tasks.filter((item) => {
    return item.date.getMonth() === APR && item.done;
  }).length;

  result[MAY] = tasks.filter((item) => {
    return item.date.getMonth() === MAY && item.done;
  }).length;

  result[JUN] = tasks.filter((item) => {
    return item.date.getMonth() === JUN && item.done;
  }).length;

  return result;
}

const line = function line(req, res) {
  "use strict";
  let result = [];
  logger('req :GET: /lineStatistic');
  Task.find({list: req.query.id}, (error, tasks) => {
    if (error || !tasks) {
      res.status(400);
      logger('res :STATUS ? 400: /lineStatistic');
    } else {
      result.push(_getStatistic(tasks));
      Task.find({}, (error, tasks) => {
        result.push(_getStatistic(tasks));
        return res.status(200).send(result);
      });
    }
  });
};


module.exports = line;
