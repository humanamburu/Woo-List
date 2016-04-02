const User = require('../../models/User');
const List = require('../../models/List');
const logger = require('../../logger');

const addList = function addList(req, res) {
  User.findById(req.body.userId, (error, user) => {
    logger('req :POST: /lists');
    if (error) {
      logger('res :STATUS ? 401: /lists');
      res.sendStatus(401);
      return false;
    }
    const list = new List({
      name: req.body.name,
      owner: user._id,
      users: [],
      invites: []
    });

    list.save((e) => {
      if (e) {
        logger('res :STATUS ? 400: /lists');
        res.sendStatus(400);
      }
      return;
    });
    logger('res :STATUS ? 200: /lists');
    res.status(200).send(list);
    return true;
  });
};

module.exports = addList;
