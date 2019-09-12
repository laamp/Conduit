// database connection
const db = require('./keys').mongoURI;
const mongoose = require('mongoose');

// models
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

// users
const users = [
    new User({
        name: 'Guest',
        email: 'guest@conduit.com',
        password: 'hunter12'
    }),
    new User({
        name: 'Lance',
        email: 'lance@conduit.com',
        password: 'hunter12'
    }),
    new User({
        name: 'Cassi',
        email: 'cassi@conduit.com',
        password: 'hunter12'
    })
];

// projects
const projects = [
    new Project({
        title: 'Important professional project',
        description: 'Plans for upcoming software'
    }),
    new Project({
        title: 'Misc errands',
        description: 'Less important tasks (errands, chores, etc.)'
    })
];

// tasks
const tasks = [
    new Task({ // project 0
        title: 'Decide on tech stack',
        description: 'Rails?, Express?, Node.js?'
    }),
    new Task({ // project 0
        title: 'Hire engineers',
        description: 'We need engineers'
    }),
    new Task({ // project 1
        title: 'Groceries',
        description: 'Milk, eggs, bread, fruit'
    }),
    new Task({ // project 1
        title: 'Get gas',
        description: 'The car is low'
    }),
    new Task({
        title: 'Call Fred',
        description: 'He left a message'
    }),
    new Task({
        title: 'Pickup kids',
        description: 'School every weekday'
    })
];

async function seed(clear = false) {
    console.log('Connecting to database...');
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log('Connection established');

    // cleans up everything from DB
    if (clear) {
        console.log('Deleting users...');
        await User.deleteMany({});
        console.log('Users deleted');

        console.log('Deleting projects...');
        await Project.deleteMany({});
        console.log('Projects deleted');

        console.log('Deleting tasks...');
        await Task.deleteMany({});
        console.log('Tasks deleted');
    }

    // save users to database
    console.log('Saving users to database...');
    for (let i = 0; i < users.length; i++) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(users[i].password, salt, (err, hash) => {
                users[i].password = hash;
            });
        });
        await users[i].save();
    }
    console.log('Users saved');

    // save projects to database
    console.log('Saving projects to database...');
    for (let i = 0; i < projects.length; i++) {
        projects[i].owner = users[0].id;
        await projects[i].save();
        users[0].projects.push(projects[i].id);
        await users[0].save();
    }
    console.log('Projects saved');

    // save tasks to database
    console.log('Saving tasks to database');
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].owner = users[0].id;
        await tasks[i].save();
    }

    tasks[0].project = projects[0].id;
    projects[0].tasks.push(tasks[0].id);
    await projects[0].save();
    tasks[0].owner = users[0].id;
    tasks[0].assignee = users[0].id;
    await tasks[0].save();
    users[0].tasks.push(tasks[0].id);
    users[0].assignedTasks.push(tasks[0].id);
    await users[0].save();

    tasks[1].project = projects[0].id;
    projects[0].tasks.push(tasks[1].id);
    await projects[0].save();
    tasks[1].owner = users[0].id;
    tasks[1].assignee = users[0].id;
    await tasks[1].save();
    users[0].tasks.push(tasks[1].id);
    users[0].assignedTasks.push(tasks[1].id);
    await users[0].save();

    tasks[2].project = projects[1].id;
    projects[1].tasks.push(tasks[2].id);
    await projects[1].save();
    tasks[2].owner = users[0].id;
    tasks[2].assignee = users[1].id;
    await tasks[2].save();
    users[1].assignedTasks.push(tasks[2].id);
    await users[1].save();
    users[2].tasks.push(tasks[2].id);
    await users[2].save();

    tasks[3].project = projects[1].id;
    projects[1].tasks.push(tasks[3].id);
    await projects[1].save();
    tasks[3].owner = users[0].id;
    tasks[3].assignee = users[1].id;
    await tasks[3].save();
    users[1].assignedTasks.push(tasks[3].id);
    await users[1].save();
    users[2].tasks.push(tasks[3].id);
    await users[2].save();

    tasks[4].owner = users[0].id;
    await tasks[4].save();
    users[1].tasks.push(tasks[4].id);
    await users[1].save();

    tasks[5].owner = users[0].id;
    await tasks[5].save();
    users[1].tasks.push(tasks[5].id);
    await users[1].save();

    console.log('Tasks saved');

    console.log('Seeding complete...');

    console.log('Disconnecting from database...');
    mongoose.disconnect();
    console.log('Disconnection complete');
}

// true to delete everything first, false to keep data
seed(true);
