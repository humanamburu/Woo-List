var User = require('../../models/User'),
    Task = require('../../models/Task');

var addTask = function (req, res) {
    User.findById(req.body.userId, function (error, user) {
        if (error) {
            res.sendStatus(401);
            return;
        }
        var task = new Task({
            list: req.body.listId,
            name: req.body.name,
            creator: req.body.userId,
            invites: []
        });

        task.save(function (error) {
            if (error) {
                res.sendStatus(400);
                return;
            }
        });
        res.status(200).send(task);
    });
};

module.exports = addTask;