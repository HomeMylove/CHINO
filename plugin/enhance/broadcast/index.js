const schedule = require('node-schedule')
const { sendGroupMsg } = require('../../../api/requests')
const printMessage = require('./printMessage')

const groupList = [
    '771671566', // 四群
    '906026830', // 原神
    '672269736', // 三好学生
    '903094947', // 家人们
    '302391473', // 后援会
]
const time = 12 // 每日12点

/**
 * @function 广播
 */
module.exports = (t = time) => {
    schedule.scheduleJob(`0 0 ${t} * * *`, async() => {
        for (let i = 0; i < groupList.length; i++) {
            const groupId = groupList[i]
            try {
                await sendGroupMsg(groupId, encodeURI(printMessage()))
            } catch (error) {
                console.log(error, 'broadcast');
            }

        }

    })
}