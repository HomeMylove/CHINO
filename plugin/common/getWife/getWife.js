const { db } = require('../../../db/createDB')

/**
 * @function 抽取一个
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {

    const { groupId, userId } = req

    // const sqlStr = 'SELECT * FROM wives'
    const sqlStr = 'SELECT * FROM wives WHERE group_id=?'

    db.query(sqlStr, [groupId], (err, results) => {
        if (err) {
            return console.log('getWife', err);
        }
        if (!results) {
            return console.log("getWife没有reuslts");
        }
        if (results.length == 0) {
            return res.sendMsg({
                groupId,
                msg: '还没有老婆呢，请先"添加老婆"吧'
            })
        }

        const wife = res.getRandomReply(results)

        let msg = `[CQ:at,qq=${userId}],你抽到的老婆是${wife['name']}`

        return res.sendMsg({
            groupId,
            msg,
            imgUrl: wife['url']
        })
    })
}