const saveWife = require('./saveWife')
const getWife = require('./getWife')
const wishTen = require('./wishTen')
const deleteWife = require('./deleteWife')
const getAllWives = require('./getAllWives')
const { getImage } = require('../../../api/requests')

const SERVE = {}

/**
 * @function 抽老婆
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = async(req, res, next) => {

    const { rawMsg, groupId, userId } = req

    if (rawMsg == '抽老婆') {
        return getWife(req, res)
    } else if (rawMsg == '老婆十连' || rawMsg == '十连老婆') {
        return wishTen(req, res)
    } else if (rawMsg == '老婆图鉴') {
        return getAllWives(res, res)
    } else if (rawMsg.indexOf('删除老婆') == 0) {
        return deleteWife(req, res)
    } else if (rawMsg.indexOf('添加老婆') == 0) {

        if (!SERVE[groupId]) {
            SERVE[groupId] = {}
        }

        if (!SERVE[groupId][userId]) {
            const name = rawMsg.replace('添加老婆', '').trim()

            SERVE[groupId][userId] = {
                name,
                url: ''
            }
            if (name) {
                return res.sendMsg({
                    groupId,
                    msg: `请发送一张${name}的图片吧(可取消)`
                })
            } else {
                return res.sendMsg({
                    groupId,
                    msg: '请输入老婆的名字(可取消)'
                })
            }
        } else {
            return res.sendMsg({
                groupId,
                msg: '你有未添加完成的老婆,' + (SERVE[groupId][userId]['name'] ? `请发送一张${SERVE[groupId][userId]['name']}的图片吧` : '请输入老婆的名字') + '(可取消)'
            })
        }
        // 进入服务
    } else if (SERVE[groupId] && SERVE[groupId][userId]) {

        if (rawMsg == '取消') {
            // 清空对象，提高效率
            delete SERVE[groupId][userId]
            if (JSON.stringify(SERVE[groupId]) == "{}") {
                delete SERVE[groupId]
            }

            return res.sendMsg({
                groupId,
                msg: '已取消添加'
            })
        }

        // 没有名字
        if (!SERVE[groupId][userId]['name']) {
            // 将他发送的 rawmsg作为 name
            if (rawMsg.indexOf('添加老婆') == 0) {
                return res.sendMsg({
                    groupId,
                    msg: '你有未添加完成的老婆,' + (SERVE[groupId][userId]['name'] ? `请发送一张${SERVE[groupId][userId]['name']}的图片吧` : '请输入老婆的名字') + '(可取消)'
                })
            }


            if (rawMsg.trim().length > 45) {
                return res.sendMsg({
                    groupId,
                    msg: '名字会不会太长了'
                })
            }
            if (rawMsg.trim().length == 0) {
                return res.sendMsg({
                    groupId,
                    msg: '你的老婆没有名字呢！再输一次吧'
                })
            }

            SERVE[groupId][userId]['name'] = rawMsg

            return res.sendMsg({
                groupId,
                msg: `请发送一张${rawMsg}的图片吧(可取消)`
            })
        }
        // 没有图片
        else {
            const reg = /\[CQ:image,file=(.+?\.image)/
            const result = rawMsg.match(reg)
            const image = result ? result[1] : ''

            if (image) {
                const response = await getImage(image)
                const { data } = response['data'] || {}
                const { url } = data || ''

                if (url) {
                    SERVE[groupId][userId]['url'] = url

                    const wifeDate = {
                        user_id: userId,
                        group_id: groupId,
                        ...SERVE[groupId][userId]
                    }
                    try {
                        const result = await saveWife(wifeDate)

                        res.sendMsg({
                            groupId,
                            msg: `添加老婆${SERVE[groupId][userId]['name']}` + (result ? "成功" : "失败")
                        })

                        // 清空对象，提高效率
                        delete SERVE[groupId][userId]
                        if (JSON.stringify(SERVE[groupId]) == "{}") {
                            delete SERVE[groupId]
                        }
                    } catch (error) {
                        console.log('抽老婆index', error);
                        return res.sendMsg({
                            groupId,
                            msg: '添加失败了'
                        })
                    }
                }
            }
        }
    } else {
        next()
    }
}

module.exports.__help = [
    ['抽老婆', '抽老婆\n添加老婆(名字)\n删除老婆(名字)\n老婆十连|十连老婆']
]