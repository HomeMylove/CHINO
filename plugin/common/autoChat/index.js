const autoChat = require('./autoChat')
const { robotName } = require('../../../config')

/**
 * @function 自动回复
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {

    let { rawMsg } = req
    if (rawMsg.indexOf('智乃') == 0) {
        req['rawMsg'] = rawMsg.replace(/智乃/, '')
        const test = rawMsg.match(/[入爹爸爷叠碟]/g)
        if (test) return
        autoChat(req, res)
    }

    next()
}

module.exports.__help = [
    ['对话', `${robotName}+任意语句`]
]