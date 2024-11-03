const User = require('../models/User');
const bcrypt = require('bcrypt');

// 登录控制器
const login = async (req, res) => {
    const { name, pwd } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: '用户不存在' });
        }

        // 验证密码
        const isMatch = await bcrypt.compare(pwd, user.pwd);
        if (!isMatch) {
            return res.status(400).json({ message: '密码错误' });
        }

        // 登录成功
        res.json({ message: '登录成功', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
};

module.exports = { login };