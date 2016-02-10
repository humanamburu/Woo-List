var Task = require('../../../models/Task'),
    Subtask = require('../../../models/Subtask');
var logger = require('../../../logger');

var addTask = function (req, res) {
    Task.findById(req.body.taskId, function (error, task) {
        logger('req :POST: /task/subtask');
        if (error) {
            res.sendStatus(401);
            return;
        }
        var subtask = new Subtask({
            task: task._id,
            name: req.body.name,
            done: req.body.done
        });

        subtask.save(function (error) {
            if (error) {
                res.sendStatus(400);
                return;
            }
        });
        res.status(200).send(subtask);
    });
};

module.exports = addTask;