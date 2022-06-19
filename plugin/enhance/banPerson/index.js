const {SUPERUSER,robotName} = require('../../../config')
const LinkedList = require('../../../utils/utils/LinkedList')


const BAN_LIST = {}
const SPEAK_LIST = {}

/**
 * @function Ban someone
 */
module.exports = (req, res, next) => {
    let {rawMsg, groupId, senderId, userId} = req
    // Record the last message
    if (userId?.toString() !== SUPERUSER) {
        SPEAK_LIST[groupId] = userId
    } else {
        if (rawMsg && rawMsg === robotName+'别理他') {
            if (!BAN_LIST[groupId]) {
                BAN_LIST[groupId] = new LinkedList()
            }
            const ban_id = SPEAK_LIST[groupId]
            if (!ban_id) return
            BAN_LIST[groupId].add(ban_id)
            return res.sendMsg({
                groupId,
                msg: `听主人的~`
            })
        } else if (rawMsg?.indexOf(robotName+"别理") === 0) {
            let ban_id
            try {
                ban_id = parseInt(rawMsg.replace(robotName+"别理", ''))
            } catch (e) {
                return
            }
            BAN_LIST[groupId].add(ban_id)
            return res.sendMsg({
                groupId,
                msg: `听主人的~`
            })
        } else if (rawMsg && rawMsg === robotName+'理他') {
            if (!BAN_LIST[groupId]) {
                return
            }
            const ban_id = SPEAK_LIST[groupId]
            if (BAN_LIST[groupId].has(ban_id)) {
                BAN_LIST[groupId].del(ban_id)
                return res.sendMsg({
                    groupId,
                    msg: `[CQ:at,qq=${ban_id}] 你可以和${robotName}说话啦，感谢主人吧`
                })
            }
        }
    }

    userId = userId ? userId : senderId
    if (BAN_LIST[groupId]?.indexOf(userId)) {
        return
    }
    next()
}