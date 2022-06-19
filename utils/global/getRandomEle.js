/**
 * @function Returns a random array element
 * @param arr {Array}
 * @returns
 */
module.exports = (arr) => {
    let num = arr.length
    num = Math.floor(Math.random() * num)
    return arr[num]
}