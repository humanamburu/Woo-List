var Task = require('../../models/Task');

var del = function (req, res) {
    Task.remove({_id: req.query.id}, function (error) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            res.sendStatus(200);
        }
    });
};

module.exports = del;