var Subtask = require('../../../models/Subtask');

var toggle = function (req, res) {
    Subtask.findOne({_id: req.query.id}, function (error, subtask) {
        logger('req :PUT: /task/subtask');
        if (error) {
            res.sendStatus(400);
        }
        else {
            subtask.done = !subtask.done;
            subtask.save();
            res.sendStatus(200);
        }
    })
};

module.exports = toggle;
