var Task = require('../../models/Task');
var logger = require('../../logger');

var updateDate = function (req, res) {
    Task.findOne({_id: req.query.id}, function (error, task) {
        logger('req :UPDATE: /task/date');
        if (error) {
            res.sendStatus(400);
        }
        else {
            task.date = req.query.date;
            task.save();
            res.sendStatus(200);
        }
    })
};

module.exports = updateDate;
