const { reqAutoChat } = require('../../../api/requests')
const { reqRuyiAi } = require('../../../api/requests')

/**
 * @function 随机回复
 * @param {*} req
 * @param {*} res 
 */
module.exports = async(req, res) => {

    let { groupId, rawMsg, userId } = req

    console.log('autoChat msg========\n', rawMsg);
    // 请求api
    rawMsg = encodeURI(rawMsg)

    try {
        // const result1 = await reqRuyiAi(rawMsg, groupId + "" + userId)

        // if (result1.status == 200) {
        //     const { data } = result1
        //     const { outputs } = data['result']['intents'][0]
        //     for (let i = 0; i < outputs.length; i++) {
        //         let item = outputs[i]
        //         if (item['type'] == 'dialog') {
        //             return res.sendMsg({
        //                 msg: item['property']['text'],
        //                 groupId
        //             })
        //         }
        //     }
        // }

        const qingyun = await reqAutoChat(rawMsg)

        if (qingyun.status == 200) {
            const { data } = qingyun
            return res.sendMsg({
                groupId,
                msg: data.content
            })
        }

    } catch (error) {
        console.log(error);
        return res.sendMsg({
            groupId,
            msg: '你说的话好深奥啊，好像哥德巴赫猜想'
        })
    }
}