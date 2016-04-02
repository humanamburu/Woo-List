const Task = require('../../models/Task');
const logger = require('../../logger');

const updateImage = function updateImage(req, res) {
  Task.findOne({ _id: req.query.id }, (error, task) => {
    logger('req :UPDATE: /task/image');
    if (error) {
      res.sendStatus(400);
    } else {
      task.img = req.query.img;
      task.save();
      res.sendStatus(200);
    }
  });
};

module.exports = updateImage;
