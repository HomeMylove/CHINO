const jokes = require('./jokes.json')

/**
 * @function 返回戴佳伟笑话
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    const {rawMsg, groupId} = req

    if (rawMsg === "戴佳伟笑话") {
       return res.sendMsg({
            groupId,
            msg: res.getRandomReply(jokes)
        })
    }

    next()
}

module.exports.__help = [
    ['戴佳伟笑话','戴佳伟笑话 | djwjoke']
]