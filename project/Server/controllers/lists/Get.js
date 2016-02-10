var User = require('../../models/User'),
    List = require('../../models/List');
var logger = require('../../logger');

var getList = function (req, res) {
    User.findById(req.query.id, function (error, user) {
        logger('req :GET: /mylist');
        if (error || !user) {
            if(req.user._id != user._id) res.status(400);
            res.status(400).redirect('/#/index');
            logger('res :STATUS ? 400: /mylist');
        }
        else {
            List.find({owner: user._id}, function (error, lists) {
                if (error) {
                    logger('res :STATUS ? 400: /mylist');
                    res.sendStatus(400);
                }
                logger('res :STATUS ? 200: /mylist');
                res.status(200).send(lists);
            });
        }

    });
};

module.exports = getList;