const { db } = require('../../../db/createDB')

/**
 * @function 获取图鉴
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {

    const { groupId, userId } = req

    // const sqlStr = 'SELECT * FROM wives'
    const sqlStr = 'SELECT * FROM wives WHERE group_id=?'

    db.query(sqlStr, [groupId], (err, results) => {
        if (err) {
            return console.log('getAllWives', err);
        }
        if (!results) {
            return console.log("geAlltWives没有reuslts");
        }
        if (results.length == 0) {
            return res.sendMsg({
                groupId,
                msg: '还没有老婆呢，请先"添加老婆"吧'
            })
        }



        return res.sendMsg({
            groupId,
            msg,
            imgUrl: wife['url']
        })
    })
}