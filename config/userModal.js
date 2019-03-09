const {query} = require('./mysql')

exports.getLottery = async (val) => {
    let _sql = 'select prize_id, prize_pre, prize_name, prize_num from lottery'
    return query(_sql, val)
}

exports.Login = async (val) => {
    let _sql = 'select * from users where username = ?'
    return query(_sql, val)
}

exports.Register = async (val) => {
    let _sql = 'insert into users (username, password) value (?, ?)'
    return query(_sql, val)
}

exports.checkUser = async (val) => {
    let _sql = 'select id, username from users where username = ?'
    return query(_sql, val)
}
