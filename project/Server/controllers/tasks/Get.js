var List = require('../../models/List'),
    Task = require('../../models/Task');

var getTasks = function (req, res) {
    List.findById(req.query.id, function (error, list) {

        if (error) {
            res.sendStatus(401);
        }
        Task.find({list: list._id}, function (error, tasks) {
            if (error) {
                res.sendStatus(400);
            }
            res.status(200).send(tasks);
        });
    });
};

module.exports = getTasks;
