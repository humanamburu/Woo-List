var passport = require('./AuthStrategy');

function Authorization(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.sendStatus(404);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(400);
            }
            return res.status(200).send(user);
        });
    })(req, res, next);
}

module.exports = Authorization;