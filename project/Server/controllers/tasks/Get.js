const List = require('../../models/List');
const Task = require('../../models/Task');
const logger = require('../../logger');

const getTasks = function getTasks(req, res) {
  List.findById(req.query.id, (error, list) => {
    logger('req :GET: /tasks');
    if (error) {
      res.sendStatus(401);
    }
    Task.find({ list: list._id }, (e, tasks) => {
      if (e) {
        res.sendStatus(400);
      }
      res.status(200).send(tasks);
    });
  });
};

module.exports = getTasks;
