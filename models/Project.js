const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
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

module.exports = Project = mongoose.model('projects', ProjectSchema);
