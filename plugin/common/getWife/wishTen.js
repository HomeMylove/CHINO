const { db } = require('../../../db/createDB')
const creatTenWish = require('./createTenWish')

/**
 * @function 抽取十个
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req, res) => {

    const { groupId, userId } = req

    // const sqlStr = 'SELECT * FROM wives'
    const sqlStr = 'SELECT * FROM wives WHERE group_id=?'

    db.query(sqlStr, [groupId], async(err, results) => {
        if (err) {
            return console.log('wishTenWife', err);
        }
        if (!results) {
            return console.log("wishTenWife没有reuslts");
        }
        if (results.length == 0) {
            return res.sendMsg({
                groupId,
                msg: '还没有老婆呢，请先"添加老婆"吧'
            })
        }

        try {
            await creatTenWish(results, groupId, userId, res).then(
                // () => {
                //     res.sendMsg({
                //         groupId,
                //         msg: `[CQ:at,qq=${userId}]你的十连如下`,
                //         imgUrl: `wives/temp/${groupId}&${userId}.png`
                //     })
                // }
            )
        } catch (error) {
            console.log("老婆十连出错啦", error);
        }
    })
}