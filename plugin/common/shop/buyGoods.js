const { db } = require('../../../db/createDB')


// 定义价格
const PRICE = [
    50, 50, 10, 10
]

/**
 * @function 购买道具
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
module.exports = (req, res) => {

    const { groupId, userId, rawMsg } = req

    const goodsNum = rawMsg.replace('购买道具', '').split(' ').filter(item => item)

    const goodList = goodsNum.map(item => {
        let index
        switch (item) {
            case '意式浓缩':
            case '1':
            case '一':
            case 'one':
                index = 1
                break;
            case '拿铁咖啡':
            case '2':
            case '二':
            case 'two':
                index = 2
                break;
            case '摩卡咖啡':
            case '3':
            case '三':
            case 'three':
                index = 3
                break;
            case '卡布奇诺':
            case '4':
            case '四':
            case 'four':
                index = 4
                break;
            default:
                index = 0
                break;
        }

        return {
            index,
            name: item
        }
    })


    if (goodList) {
        const sqlStr = 'SELECT * FROM qq_robot WHERE group_id=? AND user_id=?'
        db.query(sqlStr, [groupId, userId], (err, results) => {
            if (err) {
                return res.sendMsg({
                    groupId,
                    msg: '查找信息错误'
                })
            }

            if (results.length == 1) {

                let data = JSON.parse(results[0]['data_json'])

                if (!data) {
                    return res.sendMsg({
                        groupId,
                        msg: '客人您还没有任何金币哦,金币可通过"签到"获得'
                    })
                }

                let { coins, goods, level } = data

                goods = goods || { g1: { status: false, num: 0 }, g2: { status: false, num: 0 }, g3: { status: false, num: 0 }, g4: { status: false } } // 我的商品

                let { g1, g2, g3, g4 } = goods


                // 获取折扣
                let dis = 11 - level

                dis = dis > 1 ? dis : 1

                dis = dis / 10

                // 循环购买

                let success = [] // 成功列表
                let noMoney = 0 // 金币不足
                let wrongName = 0 // 错误名称
                let soldOut = 0 // 售罄
                let spend = 0
                while (goodList.length > 0) {
                    // 购买列表第一个

                    let { index, name } = goodList.shift()

                    // 非法商品
                    if (index == 0) {
                        wrongName++
                        continue
                    }

                    // 有效商品,金币不足
                    else if (coins < PRICE[index - 1] * dis) {
                        noMoney++
                        continue
                    } else {

                        if (index == 1 && !g1['status']) {
                            g1['num'] = g1['num'] + 1
                            g1['status'] = true
                            success.push(name)
                        } else if (index == 2 && !g2['status']) {
                            g2['num'] = g2['num'] + 1
                            g2['status'] = true
                            success.push(name)
                        } else if (index == 3 && !g3['status']) {
                            g3['num'] = g3['num'] + 1
                            g3['status'] = true
                            success.push(name)
                        } else if (index == 4 && !g4['status']) {
                            g4['status'] = true
                            success.push(name)
                            res.sendMsg({
                                groupId,
                                imgUrl: '/shop/happy.jpg'
                            })
                        } else {
                            soldOut++
                            continue
                        }
                        spend += PRICE[index - 1] * dis
                        coins -= PRICE[index - 1] * dis
                    }
                }


                // 写入数据
                data = {...data, goods, coins }

                const newData = {
                    data_json: JSON.stringify(data)
                }

                const sqlStr = 'UPDATE qq_robot SET ? WHERE group_id=? AND user_id=?'

                db.query(sqlStr, [newData, groupId, userId], (err, results) => {
                    if (err) {
                        return res.sendMsg({
                            groupId,
                            msg: '购买失败'
                        })
                    }

                    if (results.affectedRows == 1) {
                        // 整理信息
                        // 成功
                        let msg = `[CQ:at,qq=${userId}] `;

                        if (success.length > 0) msg = msg + `购买道具${success.join('、')}成功\n总共消费${spend}金币`

                        if (noMoney) msg = msg + `\n由于金币不足,${noMoney}件商品未购买`

                        if (wrongName) msg = msg + `\n${wrongName}件商品名称错误`

                        if (soldOut) msg = msg + `\n${soldOut}件商品已售罄...`

                        return res.sendMsg({
                            groupId,
                            msg
                        })
                    }
                })

            } else {
                return res.sendMsg({
                    groupId,
                    msg: '未查询到你的信息'
                })
            }


        })

    } else {
        return res.sendMsg({
            groupId,
            msg: '请先告诉智乃您要购买的道具名称吧,多件商品请用空格分隔'
        })
    }
}