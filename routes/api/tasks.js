const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Project = require('../../models/Project');
const Task = require('../../models/Task');
const validateTaskInput = require('../../validation/task');

// test route
router.get('/test', (req, res) => res.json({ msg: 'This is the tasks test route' }));

// get all tasks
router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1 })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json({ tasks: 'Could not find any tasks' }));
});

// get a specific task
router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ tasks: 'Cannot find that task' }));
});

// get all tasks assigned to a user
router.get('/user/:userId', (req, res) => {
    Task.find({ assignee: req.params.userId })
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404).json({ tasks: 'Could not find any tasks assigned to that user' }));
});

// get all tasks from a project
router.get('/project/:projectId', (req, res) => {
    let parsedId = '';
    if (req.params.projectId === 'null') parsedId = null;
    else parsedId = req.params.projectId;

    Task.find({ project: parsedId })
        .then(tasks => {
            let tasksJSON = {};
            tasks.forEach(task => tasksJSON[task._id] = task);
            res.json(tasksJSON);
        })
        .catch(err => res.status(404).json({ tasks: 'Could not find any tasks associated with that project' }));
});

// create a task
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateTaskInput(req.body);

        if (!isValid) return res.status(400).json(errors);

        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            owner: req.user.id
        });

        newTask.save()
            .then(task => {
                User.findById(req.user.id)
                    .then(user => {
                        user.tasks.push(task.id);
                        user.save();
                        res.json(task);
                    })
                    .catch(err => console.log(err));
            });
    }
);

module.exports = router;
