var logger = require('../../logger');

var auth = function (req, res) {
    logger('req :GET: /lists');
    var user;

    if (!req.isAuthenticated()) {
        res.sendStatus(401);
        logger('res :STATUS ? 401: /lists');
    }
    else {
        user = {
            name: req.user.name,
            email: req.user.email,
            _id: req.user._id
        };
        logger('res :STATUS ? 200: /lists');
        res.status(200).send(user);
    }
};

module.exports = auth;
