const pinyin = require('pinyin')
const punish = require('./punish')
const {robotName} = require('../../../config')

const TWICE_GROUP = {} // 两次叫错名字
const WRONG_GROUP = {} // 小乃子的后果
const PUNISH = {} // 惩罚
const PATIENCE = 3
const reply = require('./reply.json')


/**
 * @function Judge name
 * @param  req
 * @param  res
 * @param  next
 * @returns
 */
module.exports = async (req, res, next) => {
    const {rawMsg, groupId, userId} = req
    let name
    try {
        name = await res.getUserName({groupId, userId, flag: true})
        if (!name) {
            return
        }
    } catch (error) {
        console.log(error, 'judgeName');
        next()
    }

    // Apology
    if (rawMsg === robotName + '对不起' || rawMsg === '对不起' + robotName) {
        if (PUNISH[groupId]?.[userId] > PATIENCE) {
            delete PUNISH[groupId][userId]
            return res.sendMsg({
                groupId,
                imgUrl: 'mc/forgive.jpg',
                msg: res.getRandomReply(reply['forgive']).replace(/\$name/g, name)
            })
        }
    }

    // No apology not allowed
    if (PUNISH[groupId]?.[userId] >= PATIENCE) {
        if (PUNISH[groupId][userId]++ > PATIENCE) {
            return
        }
        return res.sendMsg({
            groupId,
            msg: res.getRandomReply(reply['angry']).replace(/\$name/g, name)
        })
    }

    // Get first 2 words
    const f2words = rawMsg.substring(0, 2) || '  '

    // Get pinyin
    const f2pinyin = pinyin(f2words, {style: pinyin.STYLE_NORMAL}) || [
        [
            []
        ],
        [
            []
        ]
    ]

    // flag
    // If wrong name
    // Default false
    let flag = false
    try {
        if (f2pinyin[0][0] === 'zhi' && f2pinyin[1][0] === 'nai' && f2words !== '智乃') {
            flag = true
            TWICE_GROUP[groupId] = f2words
        } else if (f2pinyin[0][0] === 'nai' && (f2pinyin[1][0] === 'zhi' || f2pinyin[1][0] === 'zi')) {
            flag = true
            TWICE_GROUP[groupId] = f2words
        }
    } catch (error) {
        return console.log(error)
    }

    // One more time
    if (rawMsg.indexOf(`好的${TWICE_GROUP[groupId]}`) === 0) {
        punish(groupId, userId, PUNISH)
        await res.sendMsg({
            groupId,
            msg: `都说了我不叫${TWICE_GROUP[groupId]}了啦,你再这么叫我的话我就要生气了`
        })
        TWICE_GROUP[groupId] = null
        return
    }

    // Say '小乃子'
    if (rawMsg.indexOf('小乃子') === 0) {
        punish(groupId, userId, PUNISH)
        if (!WRONG_GROUP[groupId]) {
            WRONG_GROUP[groupId] = 1
        } else {
            WRONG_GROUP[groupId] += 1
        }
        if (WRONG_GROUP[groupId] < 3) {
            return res.sendMsg({
                groupId,
                imgUrl: 'mc/sajiao.jpg'
            })
        } else if (WRONG_GROUP[groupId] < 5) {
            return res.sendMsg({
                groupId,
                imgUrl: 'mc/cry.jpg'
            })
        } else {
            WRONG_GROUP[groupId] = 0
            return res.sendMsg({
                groupId,
                imgUrl: 'mc/kage.jpg'

            })
        }
        // Other name
    } else if (flag) {
        punish(groupId, userId, PUNISH)
        return res.sendMsg({
            groupId,
            msg: `我叫智乃,不叫${f2words}!!!`,
            imgUrl: 'mc/sajiao.jpg'
        })
    }
    next()
}