const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./logger/log4js')

const CSRF = require('koa-csrf');

const app = new Koa()

const passport = require('./config/passport')

const config = require('./config')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
let sessionMysqlConfig = {
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
}
let store = new MysqlSession(sessionMysqlConfig)
let cookie = {  // 存放sessionId的cookie配置
    maxAge: 1000 * 60 * 60 * 24 * 7, // cookie有效时长
    expires: '',  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: '192.168.5.16', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
}

app.use(session({
    key: 'SESSION_ID',
    store,
    cookie
}))

app.use(passport.initialize())
app.use(passport.session())


const index = require('./routes/index')
const users = require('./routes/users')
const lottery = require('./routes/lottery')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


// add the CSRF middleware
app.use(new CSRF({
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'POST', 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: true
}));

// app.use((ctx, next) => {
//     if (![ 'GET', 'POST' ].includes(ctx.method))
//         return next();
//     if (ctx.method === 'GET') {
//         ctx.body = ctx.csrf;
//         return;
//     }
//     ctx.body = 'OK';
// });
// logger
/*app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/
// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    log4js.resLogger(ctx, ms)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(index.routes(), index.allowedMethods())
app.use(lottery.routes(), lottery.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
