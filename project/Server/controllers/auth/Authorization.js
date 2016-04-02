const passport = require('./AuthStrategy');
const logger = require('../../logger');

function Authorization(req, res, next) {
  passport.authenticate('local', (err, user) => {
    logger('req :POST: /authorization');
    if (err) {
      return next(err);
    }
    if (!user) {
      logger('res :STATUS ? 404: /authorization');
      return res.sendStatus(404);
    }
    req.logIn(user, (e) => {
      if (e) {
        logger('res :STATUS ? 400: /authorization');
        return res.sendStatus(400);
      }
      logger('res :STATUS ? 200: /authorization');
      return res.status(200).send(user);
    });
    return false;
  })(req, res, next);
}

module.exports = Authorization;
