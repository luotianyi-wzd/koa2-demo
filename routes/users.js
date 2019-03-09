const router = require('koa-router')()
const controller = require('../controller/c-users')

router.prefix('/users')

router.post('/login', controller.getLogin)
router.get('/logout', controller.getLogout)
router.post('/register', controller.getRegister)

module.exports = router

