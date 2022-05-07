const express = require('express')
    // 解决跨域问题(如果有的话)
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

class Robot {
    constructor() {
        this.app = app
        this.HELP = [] // 帮助列表
        this.app.use((req, res, next) => {
            const body = req['body']

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

            res.send('ok') // 返回以阻止多次上报

            if (!req['groupId']) {
                return
            }

            if (req['msgType'] || req['noticeType']) {
                next()
            }
        })
    }


    /**
     * @method 在res上绑定一般函数
     * @param {String} 函数名
     * @param {Function} 函数
     */
    common(funName, fun) {
        this.app.use((req, res, next) => {
            res[funName] = fun
            next()
        })
    }



    /**
     * @method 定义中间件
     * @param {String} methodName 中间件名
     * @param {Object} options 参数
     * @param {Array} options.permitted 允许通过
     * @param {Array} options.forbidden 禁止通过
     * @param {Number} options.time 一分钟回复次数
     */
    method(methodName, options) {
        options = options || {}
        const { permitted, forbidden } = options

        this.app.use(middle(options))

        function middle(options) {
            const { permitted, forbidden, time } = options
            const inner = (req, res, next) => {
                const { groupId } = req

                if (forbidden && forbidden.indexOf(groupId.toString()) != -1) {
                    next()
                } else if (permitted && permitted.indexOf(groupId.toString()) == -1) {
                    next()
                } else {
                    methodName(req, res, next)
                }
            }
            return inner
        }

        //写入帮助
        if (methodName.__help) {
            const h = { permitted, forbidden, description: methodName.__help }
            this.HELP.push(h)
        }
    }

    /**
     * @method 开启监听
     * @param {Number} post 监听端口
     * @param {Function} callback 回调
     */
    listen(post, callback) {
        this.app.listen(post, callback)
    }

}

module.exports = new Robot()