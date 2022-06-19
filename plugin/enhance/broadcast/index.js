const schedule = require('node-schedule')
const {sendGroupMsg} = require('../../../api/requests')
const printMessage = require('./printMessage')

const groupList = []
const time = 12 // The time to send a broadcast

/**
 * @function Broadcast
 */
module.exports = (t = time) => {
    schedule.scheduleJob(`0 0 ${t} * * *`, () => {
        groupList.forEach(async (groupId) => {
            try {
                await sendGroupMsg(groupId, encodeURI(printMessage()))
            } catch (error) {
                console.log(error, 'broadcast');
            }
        })
    })
}