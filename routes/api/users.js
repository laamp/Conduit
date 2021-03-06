const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/User');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');

const { OAuth2Client } = require('google-auth-library');
const devClientId = "903376099996-dmrrs41nfqdtjs0m7203s6k22rk4gset.apps.googleusercontent.com";
const prodClientId = "903376099996-3o4sf17arjo33tn9kjnloatac6i595ka.apps.googleusercontent.com";

// test route
router.get('/test', (req, res) => res.json({ msg: 'This is the users test route' }));

// sign up route
router.post('/signup', (req, res) => {
    const { errors, isValid } = validateSignupInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    // check for duplicate email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ users: 'That email has already been used' });
            } else {
                // build new user with provided credentials
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                // salt and hash password before saving it to the db
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, name: user.name };

                                jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' },
                                    (err, token) => {
                                        res.json({ success: true, token: 'Bearer ' + token });
                                    });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
});

// log in route
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(404).json({ users: 'This user does not exist' });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name };

                        jwt.sign(payload, keys.secretOrKey, { expiresIn: '1h' },
                            (err, token) => {
                                res.json({ success: true, token: 'Bearer ' + token });
                            });
                    } else {
                        return res.status(400).json({ users: 'Password is incorrect' });
                    }
                });
        });
});

// passport authentication route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// google log in / sign up route
router.post('/oauth', (req, res) => {
    let clientId = '';
    if (process.env.NODE_ENV === 'production') {
        clientId = prodClientId;
    } else {
        clientId = devClientId;
    }

    const client = new OAuth2Client(clientId);

    client.verifyIdToken({
        idToken: req.body.token,
        audience: clientId
    }).then(ticket => {
        const payload = ticket.getPayload();
        const userId = payload.sub;

        // TODO: either create user or sign the user in

        return res.status(200).json({ userId });
    }).catch(error => {
        return res.status(400).json({ message: 'invalid idtoken' });
    });
});

module.exports = router;
