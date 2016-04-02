const Task = require('../../models/Task');
const logger = require('../../logger');

const del = function del(req, res) {
  Task.remove({ _id: req.query.id }, (error) => {
    logger('req :DELETE: /task');
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = del;
