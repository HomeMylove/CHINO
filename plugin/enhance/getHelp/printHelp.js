const config = require('../../../config')

/**
 * @function
 * @param  req
 * @param  res
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
        if (permitted?.indexOf(groupId.toString()) === -1) status = false
        else if (forbidden?.indexOf(groupId.toString()) !== -1) status = false

        // ○ ●
        const circle = status ? '● ' : '○ '
        for (let j = 0; j < description.length; j++) {
            wordList.push(circle + ++count + ' ' + description[j][0])
            // Specific function
            if (rawMsg) {
                if (rawMsg === count.toString() || rawMsg === description[j][0]) {
                    return res.sendMsg({
                        groupId,
                        msg: description[j][0] + ' 语法\n' + description[j][1]
                    })
                }
            }
        }

        words.push(wordList.join('\n'))
    }
    // Wrong name or number
    if (rawMsg) {
        return
    }
    words.push('查看用法请回复:帮助+序号(或 帮助+功能名)')
    return res.sendMsg({
        groupId,
        msg: words.join('\n')
    })
}