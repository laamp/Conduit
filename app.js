const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;
const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

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
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

// routes
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
