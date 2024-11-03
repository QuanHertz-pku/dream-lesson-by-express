const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        const token = jwt.sign({ userId: user._id }, '060727', { expiresIn: '30d' }); // 替换 '你的密钥' 为实际密钥
        // 登录成功
        res.json({ message: '登录成功', token });
        
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
};

module.exports = { login };