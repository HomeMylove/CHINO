const { robotName } = require('../../../config')

module.exports = {
    longName: [
        `这么长${robotName}这么记得住嘛`,
        '你的名字这么长，自己记得住嘛？',
    ],
    rememberd: [
        `好啦，以后${robotName}就叫你$name啦`,
        `$name,好的，${robotName},记住啦`,
        `${robotName}记住啦，以后我就叫你$name啦`,
        `$name,${robotName}记住了你，$name也要记住智乃哦`,
        `$name,真好听,${robotName}记住啦`
    ],
    whoImI: [
        `${robotName}不会忘记$name,$name也不要忘记${robotName}哦`,
        `${robotName}的记性可是很好的,你就是$name吧`,
        `$name~,又在拿${robotName}寻开心吗?`
    ],
    youToMe: [
        `$name,请...请不要捉弄${robotName}了`,
        `$name,你忘记${robotName}了吗`
    ],
    iToYou: [
        `${robotName}当然不会忘记,你是我的$name呀`,
        `${robotName}你这个大笨蛋，哼~`
    ]
}