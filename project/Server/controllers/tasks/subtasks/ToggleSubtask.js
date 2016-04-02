const Subtask = require('../../../models/Subtask');
const logger = require('../../../logger');

const toggle = function toggle(req, res) {
  Subtask.findOne({ _id: req.query.id }, (error, subtask) => {
    logger('req :PUT: /task/subtask');
    if (error) {
      res.sendStatus(400);
    } else {
      subtask.done = !subtask.done;
      subtask.save();
      res.sendStatus(200);
    }
  });
};

module.exports = toggle;
