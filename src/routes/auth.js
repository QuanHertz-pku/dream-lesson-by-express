const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/try',(req,res)=>{
    res.type('text/plain')
    res.send('try')
})

router.post('/login', authController.login);

module.exports = router;
