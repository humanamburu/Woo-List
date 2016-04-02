const Task = require('../../models/Task');
const Subtask = require('../../models/Subtask');
const logger = require('../../logger');

const getTask = function getTask(req, res) {
  Task.find({ _id: req.query.id }, (error, task) => {
    logger('req :GET: /task');
    if (error) {
      res.sendStatus(400);
    } else {
      Subtask.find({ task: req.query.id }, (e, subtasks) => {
        const data = {};
        if (e) {
          res.sendStatus(400);
        } else {
          data.task = task[0];
          data.subtasks = subtasks;
          res.status(200).send(data);
        }
      });
    }
  });
};

module.exports = getTask;
