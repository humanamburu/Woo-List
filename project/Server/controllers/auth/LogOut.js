var logger = require('../../logger');

var logout = function (req, res) {
    logger('req :GET: /logout');
    req.session.destroy();
    req.logOut();
    logger('res :STATUS ? 200: /logout');
    res.sendStatus(200);
};

module.exports = logout;