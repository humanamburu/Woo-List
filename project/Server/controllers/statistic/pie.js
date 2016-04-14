const List = require('../../models/List');
const Task = require('../../models/Task');
const logger = require('../../logger');


function _getStatistic(tasks) {
  "use strict";
  let done = 0;
  let lose = 0;
  let complete = 0;
  let result = [];
  const now = new Date();

  done = tasks.filter((item) => {
    return item.done;
  }).length;

  lose = tasks.filter((item) => {
    return item.date < now && !item.done;
  }).length;

  result = [lose, tasks.length - lose - done, done];
  return result;
}

const pie = function getPieStatistic(req, res) {
  "use strict";
  let result = [];
  logger('req :GET: /pieStatistic');
  Task.find({list: req.query.id}, (error, tasks) => {
    if (error || !tasks) {
      res.status(400);
      logger('res :STATUS ? 400: /pieStatistic');
    } else {
      result.push(_getStatistic(tasks));
      Task.find({}, (error, tasks) => {
        result.push(_getStatistic(tasks));
        return res.status(200).send(result);
      });
    }
  });
};


module.exports = pie;
