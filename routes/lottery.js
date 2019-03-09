const router = require('koa-router')()
const controller = require('../controller/c-lottery')

router.prefix('/lottery')

router.get('/index', controller.getLottery)

module.exports = router
