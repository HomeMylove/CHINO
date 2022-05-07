const { db } = require('../../../db/createDB')
const { SUPERUSER } = require('../../../config')


/**
 * @function 更新一句echo
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports = (req, res) => {

    const { rawMsg, groupId, userId } = req

    let str = rawMsg.replace('update', '')

    const reg1 = /\d+/
    const reg2 = /\s+(.*?)\s+/g

    let id, question, answer

    try {
        const result1 = str.match(reg1)
        id = result1[0]
        str = str.replace(id, '')

        const result2 = str.match(reg2)
        question = result2[0].trim()

        console.log(id);
        console.log(question);

        answer = str.replace(question, '').trim()
        console.log(answer);

    } catch {
        return res.sendMsg({
            groupId,
            msg: '格式错误,正确格式 updete 123 Hello? Hi!'
        })
    }

    const user = {
        question,
        answer
    }

    let sqlStr, params

    if (userId == SUPERUSER) {
        sqlStr = 'SELECT * FROM echo WHERE group_id=? AND id=?'
        params = [groupId, id]
    } else {
        sqlStr = 'SELECT * FROM echo WHERE user_id=? AND group_id=? AND id=?'
        params = [userId, groupId, id]
    }

    db.query(sqlStr, params, (err, results) => {
        if (err) {
            return res.sendMsg({
                groupId,
                msg: '查找失败'
            })
        }
        if (results.length == 1) {
            const sqlStr = 'UPDATE echo SET ? WHERE id = ?'

            db.query(sqlStr, [user, id], (err, results) => {
                if (err) {
                    return res.sendMsg({
                        groupId,
                        msg: '替换旧问答失败'
                    })
                }
                if (results.affectedRows == 1) {
                    return res.sendMsg({
                        groupId,
                        msg: `智乃记住了,以后你可以对我说"${question}"`
                    })
                }
            })
        } else {
            return res.sendMsg({
                groupId,
                msg: '这句话不属于你,请使用 show 确认id'
            })
        }
    })

}