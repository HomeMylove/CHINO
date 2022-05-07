const { db } = require('../../../db/createDB')

const logger = require('../../../log')

/**
 * @function 判断数据库中是否有echo
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports = async(req, res) => {

    const { groupId, userId, rawMsg } = req

    const sqlStr = 'SELECT * FROM echo WHERE group_id=? AND question=?'

    return new Promise((resove, reject) => {
        db.query(sqlStr, [groupId, rawMsg], async(err, results) => {
            if (err) {
                return resove(err)
            }
            if (results.length > 0) {
                const reg = /[爹爷入爽日爸狗猪]/g
                    // 优先回复本人
                let count = 0
                for (let i = 0; i < results.length; i++) {
                    let item = results[i]
                    if (item['user_id'] == userId) {
                        let msg = item['answer'].replace(reg, '*')
                        let name
                        if (msg.indexOf('me') != -1) {
                            try {
                                name = await res.getUserName({ groupId, userId, flag: true })
                                msg = msg.replace(/me/g, name)
                                res.sendMsg({
                                    groupId,
                                    msg
                                })
                                resove(true)
                            } catch (error) {
                                console.log(error);
                                resove(false)
                            }
                        } else {
                            res.sendMsg({
                                groupId,
                                msg
                            })
                            resove(true)
                        }
                    } else {
                        count++
                    }
                }


                if (count == results.length) {
                    // 随机回复\

                    let msg = res.getRandomReply(results)['answer'].replace(reg, '*')
                    let name

                    if (msg.indexOf('me') != -1) {
                        try {
                            name = await res.getUserName({ groupId, userId, flag: true })
                            msg = msg.replace(/me/g, name)

                            res.sendMsg({
                                groupId,
                                msg
                            })
                            resove(true)
                        } catch (error) {
                            console.log(error);
                            resove(false)
                        }
                    } else {
                        res.sendMsg({
                            groupId,
                            msg
                        })
                        resove(true)
                    }

                }

            } else {
                resove(false)
            }
        })
    })
}