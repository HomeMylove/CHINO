const callName = require('./common/callName/index')
const diceGame = require('./common/diceGame/index')
const signIn = require('./common/signIn/index')
const randomAPI = require('./common/randomAPI/index')
const { genshinInfo, genshinWish } = require('./common/genshin/index')
const echo = require('./common/echo/index')
const shop = require('./common/shop/index')
const quote = require('./common/quote/index')
const autoChat = require('./common/autoChat/index')
const getWife = require('./common/getWife/index')
const luxunSay = require('./common/luxunSay/index')

const control = require('./enhance/control/index')
const judgeName = require('./enhance/judgeName/index')
const poke = require('./enhance/poke/index')
const reply = require('./enhance/reply/index')
const repeater = require('./enhance/repeater/index')
const getHelp = require('./enhance/getHelp/index')

module.exports = {
    signIn,
    diceGame,
    callName,
    randomAPI,
    quote,
    genshinInfo,
    genshinWish,
    echo,
    shop,
    autoChat,
    getWife,
    luxunSay,

    control,
    repeater,
    judgeName,
    poke,
    reply,
    getHelp
}