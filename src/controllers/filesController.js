const { get } = require('mongoose');
const File = require('../models/File');

const getFileList = async (req, res) => {
    try {
        const files = await File.find();
        console.log(files);
        const list = files.map(file => {
            return {
                id: file._id,
                filename: file.filename
            }
        });
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addFile= async (req, res) => {
    try{
        const newFile = await File.create({
            filename: "Untitled",
            filecontent: {
                "time": Date.now(),
                "blocks": [
                    {
                        "id": "mhTl6ghSkV",
                        "type": "paragraph",
                        "data": {
                            "text": "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓"
                        }
                    }
                ]
            }
        });
        console.log("新文件",newFile);
        res.status(201).json(newFile);
    } catch (error) {  
        console.log(error);
        res.status(409).json({ message: error.message });
    }

}

const getFileContent = async (req, res) => {
    try {
        const fileId = req.params.id; // 从请求参数中获取 id
        const file = await File.findById(fileId); // 使用 Mongoose 的 findById 方法查找文档

        if (!file) {
            return res.status(404).json({ message: '文件未找到' });
        }

        res.status(200).json(file); // 返回找到的文件内容
    } catch (error) {
        console.error('查询文件时出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
};


module.exports = { getFileList,addFile,getFileContent };