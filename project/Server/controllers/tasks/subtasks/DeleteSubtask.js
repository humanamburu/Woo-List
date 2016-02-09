var Subtask = require('../../../models/Subtask');

var del = function (req, res) {
    Subtask.remove({_id: req.query.id}, function (error) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });
};

module.exports = del;