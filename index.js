const robot = require('./app')

// 定时任务
const broadcast = require('./plugin/enhance/broadcast/index')
const reset = require('./plugin/enhance/schedule/reset')     // 到时候要修改
broadcast()
reset()


// 全局函数
const {sendMsg, getNickName, getRandomReply, getUserName} = require('./utils/global/index')
robot.common('sendMsg', sendMsg)
robot.common('getNickName', getNickName)
robot.common('getRandomReply', getRandomReply)
robot.common('getUserName', getUserName)

// 引入插件
const plugins = require('./plugin/index')
robot.method(plugins.control({order: ['能不能闭嘴', '可以说话了'], reply: ['这就闭嘴', '复活啦！！！']}))

robot.method(plugins.banPerson)  // 禁人
robot.method(plugins.poke) // 戳一戳
robot.method(plugins.judgeName) //
robot.method(plugins.getHelp) // 帮助
robot.method(plugins.signIn) // 签到
robot.method(plugins.shop) // 商店
robot.method(plugins.reply) // 固定回复

robot.method(plugins.control({order: ['闭嘴', '说话'], reply: ['闭嘴啦', '复活啦！！！']}))

robot.method(plugins.quote) // 群语录
robot.method(plugins.luxunSay) // 鲁迅说
robot.method((plugins.djwJoke), {permitted: ['1009880440']})   // 戴佳伟笑话

robot.method(plugins.genshinWish)
robot.method(plugins.genshinInfo,)

robot.method(plugins.diceGame) // 骰子
robot.method(plugins.callName) // 记住我
robot.method(plugins.randomAPI, {permitted: []})
robot.method(plugins.echo)
robot.method(plugins.getWife, {permitted: []})

// 测试中间件
// const test = require('./testMiddleware')
// robot.app.use(test)

robot.method(plugins.repeater)
robot.method(plugins.autoChat)

// 开启监听
robot.listen(5701, () => {
    console.log('serve is RUNNING AT 127.0.0.1:5701')
})