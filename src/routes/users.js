const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', (req, res) => {
    res.send('User list');
});

router.get('/:id', (req, res) => {
    res.send(`User with ID ${req.params.id}`);
});

module.exports = router;