var User = require('../../models/User');

var updateUser = function (req, res) {
    User.findOne({_id: req.query.id}, function (error, user) {
        if (error) {
            res.sendStatus(400);
        }
        else {
            user.name = req.query.name;
            if(req.query.password != '') {
                user.password = req.query.password;
            }
            user.save();
            res.sendStatus(200);
        }
    })
};

module.exports = updateUser;
