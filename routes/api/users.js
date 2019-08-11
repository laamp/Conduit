const express = require('express');
const router = express.Router();

// test route
router.get('/test', (req, res) => res.json({ msg: 'This is the users test route' }));

module.exports = router;
