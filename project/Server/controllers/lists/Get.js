const User = require('../../models/User');
const List = require('../../models/List');
const logger = require('../../logger');

const getList = function getList(req, res) {
  User.findById(req.query.id, (error, user) => {
    logger('req :GET: /mylist');
    if (error || !user) {
      if (req.user._id !== user._id) {
        res.status(400);
      }
      res.status(400).redirect('/#/index');
      logger('res :STATUS ? 400: /mylist');
    } else {
      List.find({ owner: user._id }, (e, lists) => {
        if (e) {
          logger('res :STATUS ? 400: /mylist');
          res.sendStatus(400);
        }
        logger('res :STATUS ? 200: /mylist');
        return res.status(200).send(lists);
      });
    }
  });
};

module.exports = getList;
