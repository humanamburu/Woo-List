const Task = require('../../models/Task');
const logger = require('../../logger');

const updateDate = function updateTask(req, res) {
  Task.findOne({ _id: req.query.id }, (error, task) => {
    logger('req :UPDATE: /task/date');
    if (error) {
      res.sendStatus(400);
    } else {
      task.date = req.query.date;
      task.save();
      res.sendStatus(200);
    }
  });
};

module.exports = updateDate;
