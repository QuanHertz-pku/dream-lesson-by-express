const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');

// 示例文件路由
router.get('/list', filesController.getFileList);

router.get('/content/:id', filesController.getFileContent);

router.post('/add', filesController.addFile);

router.put('/update/:id', filesController.updateFile);

module.exports = router;