const luxunSay = require('./luxunSay')

module.exports = async (req, res, next) => {
    const {rawMsg, groupId, userId} = req

    if (rawMsg.indexOf("鲁迅说") === 0) {
        let word = rawMsg.replace("鲁迅说", "").trim()
        if (word.length <= 30) {
            try {
                await luxunSay({word, groupId, userId})
                return res.sendMsg({
                    groupId,
                    imgUrl: `luxun/temp/${groupId}${userId}.png`
                })
            } catch (error) {
                return console.log("luxunSay error ", error)
            }
        } else {
            return res.sendMsg({
                groupId,
                msg: '太长啦，鲁迅说不出口...'
            })
        }
    }

    next()
}

module.exports.__help = [
    ['鲁迅说', '鲁迅说 吧啦吧啦']
]