/**
 * @description 定义回复语句：值应该至少有一个msg或imgUrl
 */
module.exports.replyStartWithName = {
    '我喜欢你': { msg: '我也最喜欢你了呀', imgUrl: 'mc/suki.jpg' },
    '卖萌': { imgUrl: 'mc/nyan.jpg' },
    '好可爱': { imgUrl: 'mc/kawaii.jpg' },
    '再见': { imgUrl: 'mc/byebye.jpg' },
    '我们结婚吧': { imgUrl: 'mc/dokidoki.jpg' },
    '我们分手吧': { imgUrl: 'mc/sad.jpg' },
    '': { imgUrl: 'mc/chi.jpg' },
    '亲一个': { imgUrl: 'mc/shy.jpg' },
    '早上好': { imgUrl: 'mc/ohayou.jpg' },
    '多少钱': { imgUrl: 'mc/money.jpg' },
    '撒娇': { imgUrl: 'mc/sajiao.jpg' },
    '晚安': { imgUrl: 'mc/yoru.jpg' },
    '我是你的狗': { imgUrl: 'mc/www.jpg' },
    '给我出来': { imgUrl: 'mc/kowai.jpg' },
    '干瞪眼': { imgUrl: 'mc/dengyan.jpg' },
    '我棒吗': { imgUrl: 'mc/home.jpg' },
    '不可爱': { imgUrl: 'mc/bangbang.jpg' },
    '明天见': { imgUrl: 'mc/ok.jpg' },
    '你是我的狗': { imgUrl: 'mc/chinmoku.jpg' },
    '坏': { record: 'music/sorry.mp3' },

    '你是谁': { msg: `我叫香风智乃
    你们可以叫我智乃，小智乃，哪怕你们叫我智乃酱我也能接受！
    但是请...请不要叫我小乃子好吗
    年龄的话我还是个**岁初中生(至少现在是)
    身高保密！！！(也就比小惠(姐姐..(妹妹))矮一点)
    我生日是在12月4日, 能记住的话我会很高兴的
    现在是咖啡店"Rabbit House"的看板娘
    最好的朋友是麻耶和小惠！
    想知道我能干什么，对我说"帮助"就可以啦` }
}

module.exports.replyStartWithNone = {
    '让可莉告诉你吧': { imgUrl: 'BQB/kleedk.jpg' },
    '好不好嘛': { imgUrl: 'BQB/hbhm.gif' },
    '来份色图': { imgUrl: 'BQB/sp.jpg' },
    '欢迎新人': { imgUrl: 'BQB/welcome.gif' },
    '眼镜蛇': [{ record: 'music/yanjingshe.mp3' }, { record: 'music/henshin.mp3' }],
    '蝙蝠': { record: 'music/bianfu.mp3' },
    '大聪明': { record: 'music/build.mp3' },
    '墓志铭': { record: 'music/muzhiming.mp3' },
    '火山暴龙': { record: 'music/huoshanjp.mp3' },
    '穿山甲': { record: 'music/chuanshanjia.mp3' },
    '破壳暴龙': [{ record: 'music/pokezn.mp3' }, { record: 'music/pokejp.mp3' }],
    '丘丘谣': [{ record: 'music/qiuqiuzn.mp3' }, { record: 'music/qiuqiujp.mp3' }],
    '晒太阳': [{ record: 'music/shaitaiyangzn.mp3' }, { record: 'music/shaitaiyangjp.mp3' }],
    '喵帕斯': [{ record: 'music/miao.mp3' }],
}