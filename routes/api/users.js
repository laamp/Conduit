const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// test route
router.get('/test', (req, res) => res.json({ msg: 'This is the users test route' }));

// sign up route
router.post('/signup', (req, res) => {
    // check for duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ error: 'That email has already been used' });
            } else {
                // build new user with provided credentials
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                // salt and hash password before saving it to the db
                bcrypt.genSalt(12, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

module.exports = router;
