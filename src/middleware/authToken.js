const jwt = require('jsonwebtoken');

// 自定义中间件
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 获取 Bearer 后面的 token

    if (!token) return res.sendStatus(401); // 如果没有 token，返回401未授权

    // 验证 token
    jwt.verify(token, '060727', (err, user) => {
        if (err) return res.sendStatus(403); // 如果 token 无效，返回403禁止访问
        req.user = user; // 将用户信息附加到请求对象上
        next(); // 调用下一个中间件或路由处理程序
    });
};

module.exports = authToken; // 导出中间件
