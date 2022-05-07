const { db } = require('../../../db/createDB')
const { SUPERUSER } = require('../../../config')


/**
 * @function 删除
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {

    const { groupId, userId, rawMsg } = req

    const name = rawMsg.replace('删除老婆', '').trim()

    let sqlStr
    let param
    console.log(SUPERUSER);
    if (userId == SUPERUSER) {
        sqlStr = 'DELETE FROM wives WHERE group_id=? AND name=?'
        param = [groupId, name]
        console.log("主人");
    } else {
        sqlStr = 'DELETE FROM wives WHERE group_id=? AND name=? AND user_id=?'
        param = [groupId, name, userId]
        console.log("普通热人");
    }

    db.query(sqlStr, param, (err, results) => {
        if (err || !results) {
            console.log('deleteWife', err || false)
        } else {

            if (results.affectedRows > 0) {
                return res.sendMsg({
                    groupId,
                    msg: '已删除老婆' + name
                })
            } else {
                return res.sendMsg({
                    groupId,
                    msg: '没有这个老婆，或者' + name + '不是你的老婆'
                })
            }
        }
    })
}