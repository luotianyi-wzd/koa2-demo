const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const userModal = require('./userModal')

const crypto = require('crypto')
// 用户名密码验证策略
passport.use(new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
    function (username, password, done, ctx) {
        // console.log(username, password, 'adadwwad')
        let pass = crypto.createHash('md5').update(password).digest('hex');
        userModal.Login([username]).then((res) => {
            console.log(res, 'ppppp')
            if (res !== null) {
                if (res[0].password === pass) {
                    return done(null, {username: res[0].username, id: res[0].id})
                } else {
                    return done(null, false, '密码错误')
                }
            } else {
                return done(null, false, '用户不存在')
            }
        }).catch((err) => {
            console.log(err.message)
            return done(null, false, {message: err.message})
        })
    }
))

// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
    console.log('serializeUser: ', user)
    done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function (user, done) {
    console.log('deserializeUser: ', user)
    done(null, user)
})

module.exports = passport
