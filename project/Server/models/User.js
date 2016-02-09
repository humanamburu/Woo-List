var mongoose = require('mongoose');

var User = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Zа-яА-Я\s]+$/.test(v);
            },
            message: '{VALUE} is not a valid name!'
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function(v) {
                return /^(\w|_|\.)+@\w+\.[a-z]+$/g.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                /^(\w|[а-яА-Я_]){3,64}$/g.test(v);
            },
            message: '{VALUE} is not a valid password'
        }
    }
});

module.exports = mongoose.model("User", User);