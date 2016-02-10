var passport = require('./AuthStrategy');
var logger = require('../../logger');

function Authorization(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        logger('req :POST: /authorization');
        if (err) {
            return next(err);
        }
        if (!user) {
            logger('res :STATUS ? 404: /authorization');
            return res.sendStatus(404);
        }
        req.logIn(user, function (err) {
            if (err) {
                logger('res :STATUS ? 400: /authorization');
                return res.sendStatus(400);
            }
            logger('res :STATUS ? 200: /authorization');
            return res.status(200).send(user);
        });
    })(req, res, next);
}

module.exports = Authorization;