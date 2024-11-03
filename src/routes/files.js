const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');

// 示例文件路由
router.get('/', (req, res) => {
    res.send('File list');
});

router.get('/:id', (req, res) => {
    res.send(`File with ID ${req.params.id}`);
});

module.exports = router;