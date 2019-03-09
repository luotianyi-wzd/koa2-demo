const router = require('koa-router')()
const userModal = require('../config/userModal')   //引入数据库方法

exports.getLottery = async ctx => {
    let id = ctx.query.id
    if (!ctx.isAuthenticated()) {
        ctx.body = '认证未通过'
        return
    }
    await userModal.getLottery([id]).then((res) => {
        ctx.body = {code: 1, msg: 'success', data: res}
    })
}


