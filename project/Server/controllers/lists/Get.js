var User = require('../../models/User'),
    List = require('../../models/List');

var getList = function (req, res) {
    User.findById(req.query.id, function (error, user) {
        if (error || !user) {
            if(req.user._id != user._id) res.status(400);
            res.status(400).redirect('/#/index');
        }
        else {
            List.find({owner: user._id}, function (error, lists) {
                if (error) {
                    res.sendStatus(400);
                }
                res.status(200).send(lists);
            });
        }

    });
};

module.exports = getList;