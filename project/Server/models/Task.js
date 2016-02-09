var mongoose = require('mongoose');

var Task = mongoose.Schema({
    list: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'List'
    },
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date
    },
    description: {
        type: String,
        default: ""
    },
    done : {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Task", Task);