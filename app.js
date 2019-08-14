const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes for all data types
const users = require('./routes/api/users');
const projects = require('./routes/api/projects');
const tasks = require('./routes/api/tasks');

const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

// tell app to listen on a port
app.listen(port, () => console.log(`Server is running on port ${port}`));

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

// test route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
