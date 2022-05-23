const { replyStartWithName, replyStartWithNone } = require('./reply')
const booleanReply = require('./booleanReply')
const anime = require('./anime.json')


/**
 * @function 预设回复
 * @param req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
    const { groupId, rawMsg } = req
    const nick = res.getNickName(rawMsg)
    if (nick) {
        const word = rawMsg.replace(nick, '').trim()
        for (let key in replyStartWithName) {
            if (word === key) {
                return res.sendMsg({
                    groupId,
                    ...replyStartWithName[key]
                })
            }
        }
       // 以下是 anime 台词
        for (let key in anime){
            if(word === key){
                return res.sendMsg({
                    groupId,
                    msg:res.getRandomReply(anime[key])
                })
            }
        }

    } else {
        const word = rawMsg.trim()
        for (let key in replyStartWithNone) {
            if (word == key) {
                if (replyStartWithNone[key] instanceof Array) {
                    return res.sendMsg({
                        groupId,
                        ...res.getRandomReply(replyStartWithNone[key])
                    })
                }
                return res.sendMsg({
                    groupId,
                    ...replyStartWithNone[key]
                })
            }
        }
    }

    if (rawMsg === 'words' ) {
        const words = []
        for (let key in replyStartWithName) {
            words.push(' 智乃' + key)
        }
        words.sort((a, b) => a.length - b.length)
        words.unshift('也许你可以对我说:')

        return res.sendMsg({
            groupId,
            msg: words.join('\n')
        })
    }

    // 回答 true / false
    if(booleanReply(req,res)){
        return
    }

    next()
}