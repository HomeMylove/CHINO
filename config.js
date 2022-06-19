const path = require('path')

/**
 * 配置文件
 */
module.exports = {
    robotName: '智乃',
    selfId: '6666666666',
    robotNicknames: [
        '小智乃', '智乃酱', 'チノちゃん',  'チノ', 'chino', 'chinochan'
    ], // 昵称
    SUPERUSER: '0000000000', // 超级用户
    host: 'http://127.0.0.1', //本程序的地址
    port: '5701',
    imgRoot:path.join(__dirname,'../data/image'),  // 图片地址,生成的图片会放在这里
    database: {
        host: '127.0.0.1', // 数据库的 IP 地址
        user: 'root', // 登录数据库的账号
        password: 'neta520', // 登录数据库的密码
        database: 'my_db' // 要操作的数据库
    }
}