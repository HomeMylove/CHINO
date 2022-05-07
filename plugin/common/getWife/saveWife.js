const { db } = require('../../../db/createDB')

/**
 * @function 完成添加
 * @param {object} wifeDate 
 * @param {string} wifeDate.name
 * @param {string} wifeDate.url
 * @param {string} wifeDate.user_id
 * @param {string} wifeDate.group_id
 * @returns 
 */
module.exports = (wifeDate) => {

    return new Promise((resove, reject) => {

        const sqlStr = 'INSERT INTO wives SET ?'
        db.query(sqlStr, [wifeDate], (err, results) => {
            if (err) {
                reject(false)
            } else if (results && results.affectedRows == 1) {
                resove(true)
            }

        })

    })







}