const User = require('../../models/User');
const logger = require('../../logger');

const updateUser = function updateUser(req, res) {
  User.findOne({ _id: req.query.id }, (error, user) => {
    logger('req :PUT: /user');

    if (error) {
      logger('res :STATUS ? 400: /user');
      res.sendStatus(400);
    } else {
      user.name = req.query.name;
      if (req.query.password !== '') {
        user.password = req.query.password;
      }

      user.save();
      logger('res :STATUS ? 200: /user');
      res.sendStatus(200);
    }
  });
};

module.exports = updateUser;
