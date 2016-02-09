var mongoose = require('mongoose');

var Subtask = mongoose.Schema({
    task: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Task'
    },
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Subtask", Subtask);