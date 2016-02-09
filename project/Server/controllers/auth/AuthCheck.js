var auth = function (req, res) {
    var user;

    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    }
    else {
        user = {
            name: req.user.name,
            email: req.user.email,
            _id: req.user._id
        };
        res.status(200).send(user);
    }
};

module.exports = auth;
