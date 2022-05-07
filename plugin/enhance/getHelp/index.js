const printHelp = require('./printHelp')

/**
 * @function 返回帮助
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports = (req, res, next) => {
    const { rawMsg } = req
    const keyWords = ['帮助', '功能', 'help']
    const result = keyWords.find(item => rawMsg.indexOf(item) == 0)
    if (result) {
        req['rawMsg'] = rawMsg.replace(result, '').trim()
        return printHelp(req, res)
    }
    next()
}