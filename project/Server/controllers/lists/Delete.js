const List = require('../../models/List');
const Task = require('../../models/Task');
const logger = require('../../logger');

const del = function del(req, res) {
  List.remove({ _id: req.query.id }, (error) => {
    logger('req :DELETE: /mylist');
    if (error) {
      logger('res :STATUS ? 400: /mylist');
      res.sendStatus(400);
    } else {
      Task.remove({ list: req.query.id }, (e) => {
        if (e) {
          logger('res :STATUS ? 400: /mylist');
          res.sendStatus(400);
          return false;
        }
        return true;
      });
      logger('res :STATUS ? 200: /mylist');
      res.sendStatus(200);
    }
  });
};

module.exports = del;
