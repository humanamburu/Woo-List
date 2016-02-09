var Task = require('../../models/Task');

var updateDate = function (req, res) {
    Task.findOne({_id: req.query.id}, function (error, task) {
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
