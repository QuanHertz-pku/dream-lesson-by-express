require('dotenv').config(); // 加载 .env 文件中的变量
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

const PORT = process.env.PORT || 8000; // 从环境变量中读取端口，如果没有设置则使用默认值 3000

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});


findUser();

//QuanxinQuanyi
//ct060727

// 中间件
app.use(express.json());
app.use(morgan('dev'));
// 使用 morgan 中间件，记录请求日志



// 路由模块
const usersRoutes = require('./src/routes/users');
const filesRoutes = require('./src/routes/files');
const authRoutes = require('./src/routes/auth');

// 使用路由模块
app.use('/api/users', usersRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/auth', authRoutes);

app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

app.use((err, req, res, next)=>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});