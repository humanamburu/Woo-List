const Task = require('../../models/Task');
const logger = require('../../logger');

const updateTask = function updateTask(req, res) {
  Task.findOne({ _id: req.query.id }, (error, task) => {
    logger('req :UPDATE: /task');
    if (error) {
      res.sendStatus(400);
    } else {
      if (req.query.desc === 'undefined') {
          task.done = !task.done;
      } else {
          task.description = req.query.desc;
      }
      task.save();
      res.sendStatus(200);
    }
  });
};

module.exports = updateTask;
