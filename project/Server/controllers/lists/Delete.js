var List = require('../../models/List'),
    Task = require('../../models/Task');

var del = function (req, res) {
    List.remove({_id: req.query.id}, function (error) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            Task.remove({list: req.query.id}, function (error) {
                if (error) {
                    res.sendStatus(400);
                }
            });
            res.sendStatus(200);
        }
    });
};

module.exports = del;
