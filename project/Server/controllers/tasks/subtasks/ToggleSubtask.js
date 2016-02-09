var Subtask = require('../../../models/Subtask');

var toggle = function (req, res) {
    Subtask.findOne({_id: req.query.id}, function (error, subtask) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            if (!subtask.done) {
                subtask.done = true;
            } else {
                subtask.done = false;
            }
            subtask.save();
            res.sendStatus(200);
        }
    })
};

module.exports = toggle;
