const crypto = require('crypto')
const md5 = crypto.createHash('md5')

exports.handlePassword = async (password) => {
    md5.update(password)
    const str = md5.digest('hex')
    return str
}
