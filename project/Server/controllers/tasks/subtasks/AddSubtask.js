const Task = require('../../../models/Task');
const Subtask = require('../../../models/Subtask');
const logger = require('../../../logger');

const addTask = function addTask(req, res) {
  Task.findById(req.body.taskId, (error, task) => {
    logger('req :POST: /task/subtask');

    if (error) {
      return res.sendStatus(401);
    }
    const subtask = new Subtask({
      task: task._id,
      name: req.body.name,
      done: req.body.done
    });
    subtask.save((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      return true;
    });

    return res.status(200).send(subtask);
  });
};

module.exports = addTask;
