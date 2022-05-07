const config = require('../../../config')

/**
 * @function 处理帮助请求
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {
    const { rawMsg, groupId, HELP } = req

    const words = []
    words.push(`${config.robotName}可以实现以下功能:`)

    let count = 0

    for (let i = 0; i < HELP.length; i++) {
        const { permitted, forbidden, description } = HELP[i]
        const wordList = []
        let status = true
        if (permitted) {
            if (permitted.indexOf(groupId.toString()) == -1) {
                status = false
            }
        } else if (forbidden) {
            if (forbidden.indexOf(groupId.toString()) !== -1) {
                status = false
            }
        }

        // ○●
        const circle = status ? '● ' : '○ '

        for (let j = 0; j < description.length; j++) {
            wordList.push(circle + ++count + ' ' + description[j][0])

            // 如果查看具体的功能
            if (rawMsg) {
                if (rawMsg == count || rawMsg == description[j][0]) {
                    return res.sendMsg({
                        groupId,
                        msg: description[j][0] + ' 语法\n' + description[j][1]
                    })
                }
            }
        }

        words.push(wordList.join('\n'))
    }

    if (rawMsg) {
        return
    }


    words.push('查看用法请回复:帮助+序号(或 帮助+功能名)')
    words.push('查看更多可回复:words')

    return res.sendMsg({
        groupId,
        msg: words.join('\n')
    })
}