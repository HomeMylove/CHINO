const schedule = require('node-schedule')
const { sendGroupMsg } = require('../../../api/requests')
const printMessage = require('./printMessage')

const groupList = []
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