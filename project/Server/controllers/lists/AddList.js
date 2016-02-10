var User = require('../../models/User'),
    List = require('../../models/List');
var logger = require('../../logger');

var addList = function (req, res) {
    User.findById(req.body.userId, function (error, user) {
        logger('req :POST: /lists');
        if (error) {
            logger('res :STATUS ? 401: /lists');
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
                logger('res :STATUS ? 400: /lists');
                res.sendStatus(400);
                return;
            }
        });
        logger('res :STATUS ? 200: /lists');
        res.status(200).send(list);
    });
};

module.exports = addList;