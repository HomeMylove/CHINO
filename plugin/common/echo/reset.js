const { db } = require('../../../db/createDB')

const groupId = 1
const userId = 1

const sqlStr = 'delete from echo where group_id=? and user_id=?'
db.query(sqlStr, [groupId, userId], (err, result) => {
    if (err) return console.log(err)
    console.log('ok');
})