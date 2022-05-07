const config = require('../../../config')
const punnish = require('./punnish')

const NOTICE_GROUP = {}

// 最大戳数
const relpy = require('./reply.json')


const NOTICE_TIME = relpy.poke.length + 1


const PATIENCE = 3
const PUNNISH = {}

/**
 * @function 对戳一戳作出反应
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports = async(req, res, next) => {
    const { rawMsg, groupId, noticeType, targetId, senderId, userId } = req

    //道歉
    if (rawMsg == '智乃对不起' || rawMsg == '智乃，对不起' || rawMsg == '对不起智乃' || rawMsg == '对不起，智乃') {
        if (PUNNISH[groupId] && PUNNISH[groupId][userId] > PATIENCE) {

            delete PUNNISH[groupId][userId]

            return res.sendMsg({
                groupId,
                imgUrl: 'mc/forgive.jpg',
                msg: '原谅你啦，下次别一直戳智乃啦'
            })
        }
    }

    const id = senderId || userId


    if (PUNNISH[groupId] && PUNNISH[groupId][id] >= PATIENCE) {

        if (PUNNISH[groupId][id]++ > PATIENCE) {
            return
        }


        return res.sendMsg({
            groupId,
            msg: '智乃生气了，不想理你了。。。'
        })
    }


    if (noticeType == 'notify' && targetId == config.selfId) {


        if (senderId == config.SUPERUSER) {
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

        punnish(groupId, senderId, PUNNISH)

        if (NOTICE_GROUP[groupId] == NOTICE_TIME) {
            res.sendMsg({
                groupId,
                msg: `[CQ:at,qq=${config.SUPERUSER}]主人...他们欺负我!!!`
            })
            NOTICE_GROUP[groupId] = 0
            return
        }
        try {
            const name = await res.getUserName({ groupId, userId: senderId, flag: true })
            if (!name) {
                throw new Error('no name')
            }
            return res.sendMsg({
                groupId,
                msg: relpy.poke[NOTICE_GROUP[groupId] - 1].replace('$name', name)
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