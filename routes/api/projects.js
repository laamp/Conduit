const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const Project = require('../../models/Project');
const Task = require('../../models/Task');
const validateProjectInput = require('../../validation/project');

// test route
router.get('/test', (req, res) => res.json({ msg: 'This is the projects test route' }));

// get all projects
router.get('/', (req, res) => {
    Project.find()
        .sort({ date: -1 })
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ projects: 'Could not find any projects' }));
});

// get a specific project
router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ projects: 'Could not find project with that id' }));
});

// get a user's projects
router.get('/user/:userId', (req, res) => {
    Project.find({ owner: req.params.userId })
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ projects: 'Could not find projects under that user' }));
});

// create a project
router.post('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProjectInput(req.body);

        if (!isValid) return res.status(400).json(errors);

        const newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            owner: req.user.id
        });

        newProject.save()
            .then(project => {
                User.findById(req.user.id)
                    .then(user => {
                        user.projects.push(project.id);
                        user.save();
                        res.json(project);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
);

module.exports = router;
