var Task = require('../../models/Task');
var logger = require('../../logger');

var updateImage = function (req, res) {
    Task.findOne({_id: req.query.id}, function (error, task) {
        logger('req :UPDATE: /task/image');
        if (error) {
            res.sendStatus(400);
        }
        else {
            task.img = req.query.img;
            task.save();
            res.sendStatus(200);
        }
    })
};

module.exports = updateImage;
