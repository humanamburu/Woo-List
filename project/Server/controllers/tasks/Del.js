var Task = require('../../models/Task');
var logger = require('../../logger');

var del = function (req, res) {
    Task.remove({_id: req.query.id}, function (error) {
        logger('req :DELETE: /task');
        if (error) {
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });
};

module.exports = del;