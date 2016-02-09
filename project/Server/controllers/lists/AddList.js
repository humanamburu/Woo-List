var User = require('../../models/User'),
    List = require('../../models/List');

var addList = function (req, res) {
    User.findById(req.body.userId, function (error, user) {
        if (error) {
            res.sendStatus(401);
            return;
        }
        var list = new List({
            name: req.body.name,
            owner: user._id,
            users: [],
            invites: []
        });

        list.save(function (error) {
            if (error) {
                res.sendStatus(400);
                return;
            }
        });
        res.status(200).send(list);
    });
};

module.exports = addList;