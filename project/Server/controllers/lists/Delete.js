var List = require('../../models/List'),
    Task = require('../../models/Task');
var logger = require('../../logger');

var del = function (req, res) {
    List.remove({_id: req.query.id}, function (error) {
        logger('req :DELETE: /mylist');
        if (error) {
            logger('res :STATUS ? 400: /mylist');
            res.sendStatus(400);
        }
        else {
            Task.remove({list: req.query.id}, function (error) {
                if (error) {
                    logger('res :STATUS ? 400: /mylist');
                    res.sendStatus(400);
                }
            });
            logger('res :STATUS ? 200: /mylist');
            res.sendStatus(200);
        }
    });
};

module.exports = del;
