const {getGroupMemberInfo} = require('../../api/requests')
const Dbc = require('../utils/Dbc')


/**
 * @function Get Group member's name
 * @param groupId {string}
 * @param  userId {string}
 * @param flag {boolean}  Use nickname
 * @returns
 */
module.exports = async ({groupId, userId, flag = false}) => {
    const sqlStr = "select name from robot_name where user_id=? and group_id=?"
    try {
        const dbc = new Dbc()
        const result = await dbc.select(sqlStr,userId,groupId)
        if (result.length > 0  && result[0]?.['name'].trim() !== '') {
            return result[0]['name']
        } else {
            if (flag) {
                try {
                    const response = await getGroupMemberInfo(groupId, userId)
                    if (response.status === 200) {
                        const data = response['data']['data']
                        return data['card'] || data['nickname']
                    } else {
                        return undefined
                    }
                } catch (error) {
                    console.log('getUserName', error);
                    return undefined
                }
            } else {
                return undefined
            }
        }
    } catch (error) {
        console.log('getUserName', error);
    }
}