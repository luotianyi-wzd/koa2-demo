# Koa2-demo

使用koa2框架搭建了一个后台，手动添加了各种中间件

### 初始化项目

```
npm install | yarn
```

### 启动

```
npm run start | npm run watch(pm2 watch模式) | npm run pm2(pm2 配置启动)
```

### 中间件

* koa-bodyparser - post参数处理
* crypto - 密码加密
* log4js - log4js日志
* koa-mysql-session + koa-session-minimal - session以及session存入数据库
* mysql - 连接MySQL数据库
* passport - 登录验证

### 说明

使用koa2完成了后台的一些功能，包括登录，注册，查询等一些功能
