/**
 * @function Increases the number of the member by 1
 * @param groupId
 * @param  sender
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