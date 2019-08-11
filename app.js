const mongoose = require('mongoose');
const express = require('express');
const app = express();
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;

// tell app to listen on a port
app.listen(port, () => console.log(`Server is running on port ${port}`));

// connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

// test route
app.get('/', (req, res) => res.send('Hello, world!'));
