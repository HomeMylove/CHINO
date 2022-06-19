const {db} = require('../../db/createDB')
const dateFormat = require('../tools/dateFormat')

// JavaScript Database Connectivity
module.exports =  class Dbc {
    select(sql, ...params) {
        return new Promise((resolve, reject) => {
            db.query(sql, [...params], (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || "no results")
                }
                resolve(results)
            })
        })
    }

    selectObject(sql, obj) {
        return new Promise((resolve, reject) => {
            db.query(sql, obj, (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                resolve(results)
            })
        })
    }

    update(sql, ...params) {
        return new Promise((resolve, reject) => {
            db.query(sql, [...params], (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                if (results.affectedRows > 0) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }

    updateObject(sql, obj) {
        return new Promise  ((resolve, reject) => {
            db.query(sql, obj, (err, results) => {
                if (err || !results) {
                    console.log(err, dateFormat())
                    return reject(err || 'no results')
                }
                if (results.affectedRows > 0) {
                    return resolve(true)
                } else {
                    return resolve(false)
                }
            })
        })
    }

    close(){
        db.end()
    }
}