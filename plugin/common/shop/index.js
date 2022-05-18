const showGoods = require('./showGoods')
const buyGoods = require('./buyGoods')
const myGoods = require('./myGoods')
const useGoods = require('./useGoods')

/**
 * @function 商城功能
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports = (req, res, next) => {

    const { rawMsg } = req

    if (rawMsg === '商店' || rawMsg === 'shop') {
        return showGoods(req, res)
    } else if (rawMsg.indexOf('购买道具') === 0) {
        return buyGoods(req, res)
    } else if (rawMsg === '我的道具') {
        return myGoods(req, res)
    } else if (rawMsg.indexOf('使用道具') === 0 || rawMsg === '补签' ||rawMsg === '双倍' || rawMsg === '改运' ||rawMsg === '改命' || rawMsg === '逆天改命') {
        return useGoods(req, res)
    }

    next()
}

module.exports.__help = [
    ['商店', '1.商店 | shop\n2.购买道具+序号\n3.我的道具+序号\n4.使用道具+序号']
]