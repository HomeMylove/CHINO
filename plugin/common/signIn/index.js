const { signIn } = require('./signIn')

/**
 * @function Sign-in
 * @param req
 * @param res
 * @param  next
 * @returns 
 */
module.exports = (req, res, next) => {
    const { rawMsg } = req
    if (rawMsg === '签到' || rawMsg === '到签') {
        return signIn(req, res)
    }
    next()
}

module.exports.__help = [
    ['签到', '签到']
]