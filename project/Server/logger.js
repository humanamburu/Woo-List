var friendlyTime = function() {
    var now = new Date();
    var friendlyDate = now.getHours() + ':' + now.getMinutes();
    return friendlyDate;
};

var logger = function(log) {
    console.log(friendlyTime() + ' * ' + log);
};

module.exports = logger;