const wish = require('./wish')
const getRoleOrWeapon = require('./getRoleOrWeapon')

/**
 * @function 原神祈愿
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.genshinWish = (req, res, next) => {

    const { rawMsg, groupId } = req

    if (rawMsg == '抽卡' || rawMsg == '十连') {
        return wish(req, res)
    } else if (rawMsg.indexOf('info') == 0 || rawMsg.indexOf('信息') == 0) {
        console.log('进来了');
        return getRoleOrWeapon(req, res)
    }
    next()
}

module.exports.genshinWish.__help = [
    ['祈愿', '抽卡\n十连'],
]


/**
 * @function 原神信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports.genshinInfo = (req, res, next) => {
    const { rawMsg, groupId } = req

    if (rawMsg.indexOf('info') == 0 || rawMsg.indexOf('信息') == 0) {

        return getRoleOrWeapon(req, res)
    }
    next()
}

module.exports.genshinInfo.__help = [
    ['查原神', '信息/info + name']
]