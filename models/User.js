const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false,
        default: ''
    },
    role: {
        type: String,
        required: false,
        default: ''
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'projects'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }],
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = User = mongoose.model('users', UserSchema);
