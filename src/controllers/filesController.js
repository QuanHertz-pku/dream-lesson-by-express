const File = require('../models/File');

const getFileList = async (req, res) => {
    try {
        const files = await File.find();
        console.log("获取文件列表:", files);
        const list = files.map(file => ({
            id: file._id,
            filename: file.filename
        }));
        res.status(200).json(list);
    } catch (error) {
        console.error("获取文件列表时出错:", error);
        res.status(500).json({ message: "服务器内部错误" });
    }
}

const addFile = async (req, res) => {
    try {
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
        console.log("新文件创建成功:", newFile);
        res.status(201).json(newFile);
    } catch (error) {
        console.error("创建文件时出错:", error);
        res.status(500).json({ message: "服务器内部错误" });
    }
}

const getFileContent = async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);

        if (!file) {
            return res.status(404).json({ message: "文件未找到" });
        }

        console.log("文件内容获取成功:", file);
        res.status(200).json(file);
    } catch (error) {
        console.error("查询文件时出错:", error);
        res.status(500).json({ message: "服务器内部错误" });
    }
};
const updateFile = async (req, res) => {
    try {
        console.log("更新请求:", req.body);
        const { id } = req.params;
        const content = req.body;

        // 调试输出，确保请求数据正确
        console.log("更新请求的文件 ID:", id);
        console.log("更新内容:", content);

        // 使用 findByIdAndUpdate 更新文件内容
        await File.findByIdAndUpdate(
            id,
            { filecontent: content },
            { new: true, upsert: false } // 确保返回更新后的文档且不新建
        );

        // 手动查找已更新的文件，确保获取的是最新数据
        const updatedFile = await File.findById(id);

        if (!updatedFile) {
            return res.status(404).json({ message: "文件未找到" });
        }

        console.log("文件更新成功:", updatedFile);
        res.status(200).json(updatedFile); // 返回更新后的文件内容
    } catch (error) {
        console.error("更新文件时出错:", error);
        res.status(500).json({ message: "服务器内部错误" });
    }
};

module.exports = { getFileList, addFile, getFileContent, updateFile };
