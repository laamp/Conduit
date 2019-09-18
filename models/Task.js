const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    dueDate: {
        type: Date,
        required: false,
        default: null
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false,
        default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: false,
        default: null
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = Task = mongoose.model('tasks', TaskSchema);
