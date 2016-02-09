var Task = require('../../models/Task'),
    Subtask = require('../../models/Subtask');

var getTask = function (req, res) {
    Task.find({_id: req.query.id}, function (error, task) {
        if (error) {
            res.sendStatus(400);
        } else {
            Subtask.find({task: req.query.id}, function (error, subtasks) {
                var data = {};
                if (error) {
                    res.sendStatus(400);
                } else {
                    data.task = task[0];
                    data.subtasks = subtasks;
                    res.status(200).send(data);
                }
            });
        }

    });
};

module.exports = getTask;
