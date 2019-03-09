const userModal = require('../config/userModal')
const passport = require('../config/passport')

const handlePassword = require('../utils/index')
const crypto = require('crypto')

exports.getRedirectUsers = async ctx => {
    ctx.redirect('/users')
}

exports.getLogin = async ctx => {
    let username = ctx.request.body.username
    let pass = ctx.request.body.password
    if (!username || !pass) {
        ctx.body = {code: 0, msg: 'faild', message: '账号密码不全'}
        return
    }
    let password = crypto.createHash('md5').update(pass).digest('hex');
    console.log(username, password)
    return passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {code: -1, msg: err}
        } else {
            //拿到登陆用户
            console.log(ctx,'csrf')
            if (user) {
                ctx.body = {code: 1, msg: 'success', message: '登陆成功', csrf: ctx.csrf}
                return ctx.login(user)
            } else {
                ctx.body = {code: 0, msg: 'faild', message: info}
            }
        }
    })(ctx)
}

exports.getLogout = async ctx => {
    console.log('tuichu')
    ctx.logout()
    ctx.body = {code: 1, msg: 'success', message: '退出登录'}
}

exports.getRegister = async ctx => {
    let username = ctx.request.body.username
    let pass = ctx.request.body.password
    if (!username || !pass) {
        ctx.body = {code: 0, msg: 'faild', message: '账号密码不全'}
        return
    }
    let password = crypto.createHash('md5').update(pass).digest('hex');
    let checkUser = await userModal.checkUser([username]).then(res => {
        if (res.length !== 0 && res[0].username === username) {
            ctx.body = {code: 0, msg: 'faild', message: '账号已存在'}
            return false
        } else {
            return true
        }
    })
    if (checkUser) {
        console.log('register:', username, password, checkUser)
        await userModal.Register([username, password]).then(res => {
            console.log(res.affectedRows)
            if (res.affectedRows) {
                ctx.body = {code: 1, msg: 'success', message: '注册成功'}
            }
        })
    }
}
