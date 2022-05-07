const config = require('../../../config')

/**
 * @function 返回一个控制中间件
 * @param {object} options 
 * @param {Array} options.order 命令数组,应该有两个元素
 * @param {Array} options.reply 回复数组，应该有两个元素
 * @returns 
 */
module.exports = (options) => {
    let { order, reply } = options || {}
    if (!(order && reply)) return (req, res, next) => next()
        // 闭嘴群组
    let sleepList = []

    /**
     * @function 控制智乃闭嘴与说话
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async function inner(req, res, next) {
        const { groupId, userId, rawMsg } = req

        if (userId == config.SUPERUSER) {
            if (rawMsg == `${config.robotName}${order[0]}`) {

                if (sleepList.indexOf(groupId) == -1) {
                    sleepList.push(groupId)

                    return res.sendMsg({
                        groupId,
                        msg: `${config.robotName}` + reply[0]
                    })
                }
            } else if (rawMsg == `${config.robotName}${order[1]}`) {

                if ((index = sleepList.indexOf(groupId)) != -1) {
                    sleepList.splice(index, 1)

                    return res.sendMsg({
                        groupId,
                        msg: `${config.robotName}` + reply[1]
                    })
                }
            }
        }

        if (sleepList.indexOf(groupId) != -1) {
            return
        }
        next()
    }

    return inner
}