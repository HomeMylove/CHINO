/**
 * @function 惩罚 会将传入的成员 次数加1
 * @param {*} groupId
 * @param {*} sender
 * @param list
 */
module.exports = (groupId, sender, list) => {
    if (!list[groupId]) {
        list[groupId] = {}
    }
    if (!list[groupId][sender]) {
        list[groupId][sender] = 0
    }
    list[groupId][sender] += 1
}