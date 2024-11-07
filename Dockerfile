# 使用官方的 Node 20.18.0 镜像作为基础镜像
FROM node:20.18.0

# 创建并设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将源代码复制到容器中
COPY . .

# 暴露端口
EXPOSE 5000

# 启动应用
CMD ["npm", "start"]

