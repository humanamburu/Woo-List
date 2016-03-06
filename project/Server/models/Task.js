var mongoose = require('mongoose');
var tommorow = new Date();

tommorow.setDate(tommorow.getDate() + 1);

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
        type: Date,
        default: tommorow
    },
    created: {
      type: Date,
      default: new Date()
    },
    description: {
        type: String,
        default: ""
    },
    img: {
        type: String,
        default: "http://z-teh.ru/wp-content/themes/z-teh_shop/assets//img/placeholder.png"
    },
    done : {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model("Task", Task);
