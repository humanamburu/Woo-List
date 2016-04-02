const User = require('../../models/User');
const Task = require('../../models/Task');
const logger = require('../../logger');

const addTask = function addTask(req, res) {
  User.findById(req.body.userId, (error, user) => {
    logger('req :POST: /task');
    if (error) {
      return res.sendStatus(401);
    }

    const task = new Task({
      list: req.body.listId,
      name: req.body.name,
      creator: req.body.userId,
      invites: []
    });

    task.save((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      return true;
    });
    return res.status(200).send(task);
  });
};

module.exports = addTask;
