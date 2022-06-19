const {selfId, SUPERUSER, robotName} = require('../../../config')
const punish = require('./punish')

const NOTICE_GROUP = {}
const reply = require('./reply.json')
const NOTICE_TIME = reply.poke.length + 1
const PATIENCE = 3
const PUNISH = {}

/**
 * @function Respond to a poke
 * @param  req {Object}
 * @param  res {Object}
 * @param  next {function}
 * @returns
 */
module.exports = async (req, res, next) => {
    const {rawMsg, groupId, noticeType, targetId, senderId, userId} = req
    // Apology
    if (rawMsg === `${robotName}对不起` || rawMsg === `对不起${robotName}`) {
        if (PUNISH[groupId]?.[userId] > PATIENCE) {
            delete PUNISH[groupId][userId]
            return res.sendMsg({
                groupId,
                imgUrl: 'mc/forgive.jpg',
                msg: '原谅你啦，下次别一直戳智乃啦'
            })
        }
    }

    const id = senderId || userId
    if (PUNISH[groupId]?.[id] >= PATIENCE) {
        if (PUNISH[groupId][id]++ > PATIENCE) {
            return
        }
        return res.sendMsg({
            groupId,
            msg: '智乃生气了，不想理你了。。。'
        })
    }


    if (noticeType === 'notify' && targetId === selfId) {
        if (senderId === SUPERUSER) {
            return res.sendMsg({
                groupId,
                msg: '嘻嘻,主人'
            })
        }

        if (NOTICE_GROUP[groupId]) {
            NOTICE_GROUP[groupId]++
        } else {
            NOTICE_GROUP[groupId] = 1
        }
        punish(groupId, senderId, PUNISH)
        if (NOTICE_GROUP[groupId] === NOTICE_TIME) {
            await res.sendMsg({
                groupId,
                msg: `[CQ:at,qq=${SUPERUSER}]主人...他们欺负我!!!`
            })
            NOTICE_GROUP[groupId] = 0
            return
        }
        try {
            const name = await res.getUserName({groupId, userId: senderId, flag: true})
            if (!name) {
                return
            }
            return res.sendMsg({
                groupId,
                msg: reply.poke[NOTICE_GROUP[groupId] - 1].replace(/\$name/g, name)
            })
        } catch (error) {
            console.log('poke', error);
            return res.sendMsg({
                groupId,
                msg: '不要戳啦！再戳...再戳我要告诉主人啦!!!'
            })
        }
    } else if (rawMsg) {
        next()
    }
}