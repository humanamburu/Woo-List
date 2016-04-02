const logger = require('../../logger');

const auth = function auth(req, res) {
  logger('req :GET: /lists');

  if (!req.isAuthenticated()) {
    res.sendStatus(401);
    logger('res :STATUS ? 401: /lists');
  } else {
    const user = {
      name: req.user.name,
      email: req.user.email,
      _id: req.user._id
    };

    logger('res :STATUS ? 200: /lists');
    res.status(200).send(user);
  }
};

module.exports = auth;
