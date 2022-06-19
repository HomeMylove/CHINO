const config = require('../../../config')
const LinkedList = require('../../../utils/utils/LinkedList')

/**
 * @function Return a control middleware
 * @param {object} options 
 * @param {Array} options.order The command array, should have two elements
 * @param {Array} options.reply The reply array, should have two elements
 * @returns middleware
 */
module.exports = (options) => {
    let { order, reply } = options || {}
    if (!(order && reply)) throw new Error("Control 缺少参数")
    const sleepList = new LinkedList();

    /**
     * @function Control Chino to shut up and speak
     * @param req
     * @param res
     * @param next
     * @returns 
     */
    async function inner(req, res, next) {
        const { groupId, userId, rawMsg } = req
        if (userId === config.SUPERUSER) {
            if (rawMsg === `${config.robotName}${order[0]}`) {
                if (!sleepList.has(groupId)) {
                    sleepList.add(groupId)
                    return res.sendMsg({
                        groupId,
                        msg: `${config.robotName}` + reply[0]
                    })
                }
            } else if (rawMsg === `${config.robotName}${order[1]}`) {
                if ((sleepList.has(groupId))) {
                    sleepList.del(groupId)
                    return res.sendMsg({
                        groupId,
                        msg: `${config.robotName}` + reply[1]
                    })
                }
            }
        }

        if (sleepList.has(groupId)) {
            return
        }
        next()
    }
    return inner
}