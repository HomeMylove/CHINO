const {robotName, robotNicknames} = require('../../config')

const nickNames = [robotName, ...robotNicknames]

/**
 * @function Gets the start name of the statement
 * @param rawMsg {string} Raw message
 * @returns name The best name
 */
module.exports = rawMsg => {
    let name = ''
    for (let i = 0; i < nickNames.length; i++) {
        let item = nickNames[i]
        if (rawMsg.toLowerCase().indexOf(item) === 0 && item.length >= name.length) {
            name = item
        }
    }
    return name
}