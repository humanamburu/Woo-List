const Subtask = require('../../../models/Subtask');
const logger = require('../../../logger');

const del = function del(req, res) {
  Subtask.remove({ _id: req.query.id }, (error) => {
    logger('req :DELETE: /task/subtask');
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = del;
