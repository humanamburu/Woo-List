var Task = require('../../models/Task');

var updateTask = function (req, res) {
    Task.findOne({_id: req.query.id}, function (error, task) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            if (req.query.desc === 'undefined') {
                task.done = !task.done;
            } else {
                task.description = req.query.desc;
            }

            task.save();
            res.sendStatus(200);
        }
    })
};

module.exports = updateTask;
