var User = require('../../models/User');

function Registration(req, res) {
    logger('req :POST: /registration');
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function (error) {
        if (error) {
            logger('res :STATUS ? 400: /registration');
            res.sendStatus(400);
        } else {
            logger('res :STATUS ? 200: /registration');
            res.sendStatus(200);
        }
    });
}

module.exports = Registration;