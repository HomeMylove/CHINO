const { db } = require('../../db/createDB')
const selectData = require('../dbFuns/selectData')
const { getGroupMemberInfo } = require('../../api/requests')

/**
 * @function 获取记住的名字
 * @param {*} groupId 
 * @param {*} userId
 * @param {boolean} flag 如果没有name是否要获取信息
 * @returns 
 */
module.exports = async({ groupId, userId, flag = false }) => {
    const user = {
        group_id: groupId,
        user_id: userId
    }
    try {
        const result = await selectData('qq_robot', user)
        if (result.length > 0 && result[0]['name'] && result[0]['name'].trim() != '') {
            return result[0]['name']
        } else {
            if (flag) {
                try {
                    const response = await getGroupMemberInfo(groupId, userId)
                    if (response.status == 200) {
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