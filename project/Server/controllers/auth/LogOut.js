var logout = function (req, res) {
    req.session.destroy();
    req.logOut();
    res.sendStatus(200);
};

module.exports = logout;