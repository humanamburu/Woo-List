var User = require('../../models/User');

function Registration(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save(function (error) {
        error ? res.sendStatus(400) : res.sendStatus(200);
    });
}

module.exports = Registration;