const express = require('express')
const LinkedList = require('./utils/utils/LinkedList')
const cors = require('cors')
const {SUPERUSER, robotName} = require("./config");
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

class Robot {
    constructor() {
        this.app = app
        this.HELP = []
        this.app.use((req, res, next) => {
            const body = req['body']

            // Map the keys on body to req and rename them
            req['groupId'] = body['group_id']
            req['rawMsg'] = body['raw_message']
            req['msgId'] = body['message_id']
            req['msgSeq'] = body['message_seq']
            req['msgType'] = body['message_type']
            req['postType'] = body['post_type']
            req['selfId'] = body['self_id']
            req['sender'] = body['sender']
            req['subType'] = body['sub_type']
            req['time'] = body['time']
            req['userId'] = body['user_id']
            req['noticeType'] = body['notice_type']
            req['targetId'] = body['target_id']
            req['senderId'] = body['sender_id']
            req['HELP'] = this.HELP
            res.send('ok')  // Return OK to prevent multiple reporting
            if (!req['groupId']) return // If there is no groupId, it should not continue
            if (req['msgType'] || req['noticeType']) next() // Next only if it has msgType or noticeType
        })
    }

    /**
     * The function body should be a valid middleware
     * @method Bind common functions to res
     * @param funName {String} The function name
     * @param fun {Object} The function body
     */
    common(funName, fun) {
        this.app.use((req, res, next) => {
            res[funName] = fun
            next()
        })
    }


    /**
     * @method Installing a plug-in
     * @param {function} methodName The plug-in name
     * @param {{permitted: Array<String>, forbidden: Array<string>, time: Number}|{}} options Options
     * @param {Array<String>} options.permitted  Groups that are permitted to pass
     * @param {Array<string>} options.forbidden  Groups that are forbidden to pass
     * @param {Number} options.time Number of replies in one minute
     */
    method(methodName, options) {
        options = options || {}
        const {permitted, forbidden} = options
        this.app.use(middle(options))

        function middle(options) {
            const banList = new LinkedList();
            const {permitted, forbidden} = options
            return (req, res, next) => {
                const {groupId, userId, rawMsg} = req
                if (userId.toString() === SUPERUSER) {
                    if (rawMsg === '关闭' + methodName.__name) {
                        banList.add(groupId.toString())
                    }
                    if (rawMsg === '开启' + robotName.__name) {
                        banList.del(groupId.toString())
                    }
                }
                if (banList.has(groupId.toString())) return next()
                if (forbidden?.indexOf(groupId.toString()) !== -1) return next()
                else if (permitted?.indexOf(groupId.toString()) === -1) return next()
                else {
                    methodName(req, res, next)
                }
            }
        }

        // Write help
        if (methodName.__help) {
            const h = {permitted, forbidden, description: methodName.__help}
            this.HELP.push(h)
        }
    }

    /**
     * @method Listen
     * @param post {Number} Post number
     * @param callback {function}  Callback function
     */
    listen(post, callback) {
        this.app.listen(post, callback)
    }
}

module.exports = new Robot()