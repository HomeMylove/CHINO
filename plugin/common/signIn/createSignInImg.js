const sharp = require('sharp')
const {judgeTime} = require('./judgeTime')
const path = require('path')
const fs = require('fs')

const imgPath = path.join(__dirname, '../../../../data/images/signIn')


/**
 * @function 绘制签到图片
 * @param {object} userInfo 传入生成图片需要的用户参数
 * @param {int} userInfo.groupId 群组id，用于生成图片名称
 * @param {int} userInfo.userId 用户id，用于生成图片名称
 * @param {string} userInfo.nickname 用户名，出现在图片上
 */
async function createSignInImg(userInfo) {
    // const rawData = {
    //     exp: 18, // 经验
    //     level: 10, // 等级
    //     coins: 100, // 硬币
    //     checkInStatus: false, // 签到状态
    //     checkInDays: 10, // 连续天数
    //     notCheckInDays: 0, // 未签到天数
    //     checkInRecords: 10, // 上次连续记录
    //     goods: { g1: 0, g2: 0, g3: 0, g4: 0 }, // 我的商品
    //     double: true, // 是否开启双倍经验
    //     fortune:0;
    // }
    const {
        userId,
        groupId,
        nickname,
        data,
        flags,
        flip
    } = userInfo

    // 定义画布的大小
    const width = 1854
    const height = 1100

    // 定义时间和问候语
    const {greeting, date} = judgeTime()

    // 定义绘制的数据
    const {exp, level, checkInDays, fortune, coins, notCheckInDays} = data

    const {checkIn, double} = flags

    const day = checkInDays + '天' + (notCheckInDays == 1 ? '(可补签)' : '')

    let result
    if (checkIn) {
        result = '已经签到过啦'
    } else {
        let add = checkInDays <= 10 ? Math.ceil(checkInDays / 2) : 5
        if (double) {
            result = `经验+${add}*2 金币+${add * 10}`
        } else {
            result = `经验+${add} 金币+${add * 10}`
        }
    }

    // 经验条
    const bar = Math.ceil(exp * 0.6)


    let luck
    // 计算运势
    switch (fortune) {
        case 1:
        case 2:
            luck = '大凶';
            break;
        case 3:
        case 4:
            luck = '小凶';
            break;
        case 5:
        case 6:
            luck = '小吉';
            break;
        case 7:
        case 8:
            luck = '中吉';
            break;
        case 9:
        case 10:
            luck = '大吉';
            break;
    }

    let star = ""
    let fullStar = ""
    let oneStar = ""

    if(fortune === 10){
        fullStar = "★★★★★★★★★★";
    }else if(fortune === 1){
        oneStar = "★☆☆☆☆☆☆☆☆☆"
    }
    else {
        let starList = []
        for (let i = 0; i < fortune; i++) {
            starList.push('★')
        }
        for (let i = 0; i < 10 - fortune; i++) {
            starList.push('☆')
        }

        star = starList.join('')
    }


    const svgImage = `
        <svg width="${width}" height="${height}">
        <style>
        <font>
        <font-face font-family="SimSun SimHei YouYuan"/>
        </font>
        .title{
            fill:black;
            font-size:200px;
            font-weight:400;
            font-family:"SimHei"
        }
        .content{
            fill:rgb(33,33,33);
            font-size:60px;
            font-weight:100;
            font-family:"YouYuan"
        }

        .luck{
            fill:black;
            font-size:100px;
            font-weight:400;
            font-family:"SimHei";
        }
        .star{
            fill:black;
            font-size:80px;
            font-weight:400;
            font-family:"SimHei";
        }
        .fullstar{
        fill: gold;
        }
        .onestar{
        fill: red;
        }
        </style>
        <text x="10%" y="228"  class="title" >${greeting}</text>
        <text x="65%" y="228"  class="title" >${date}</text>
        <text x="10%" y="342"  class="content" >@${nickname} ${result}</text>
        <text x="10%" y="448"  class="content" >已连续签到${day}</text>
        <text x="10%" y="554"  class="content" >当前金币${coins}</text>
        <text x="10%" y="660"  class="content" >LEVEL:${level}</text>

        <rect x="10%" y="698" width="60%" height="106" fill="rgb(151, 151, 151)"/>
        <rect x="10%" y="698" width="${bar}%" height="106" fill="rgb(102, 102, 102)"/>
        <text x="73%" y="774" class="content">${exp}/100</text>

        <text x="10%" y="926" class="luck">今日运势:${luck}</text>
        <text x="10%" y="1026" class="star">${star}</text>
        <text x="10%" y="1026" class="star fullstar">${fullStar}</text>
        <text x="10%" y="1026" class="star onestar">${oneStar}</text>
        </svg>
        `

    const svgBuffer = Buffer.from(svgImage)

    // 获取随机图片作为背景
    const files = fs.readdirSync(path.join(imgPath, '/background'))

    const imgName = files[Math.floor(Math.random() * files.length)]

    if (!flip) {
        await sharp(path.join(imgPath, `/background/${imgName}`))
            .resize({
                width: 1854,
                height: 1088
            })
            .extend({
                bottom: height,
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1
                }
            })
            .composite([{
                input: svgBuffer,
                top: 1088,
                left: 0
            }])
            .toFile(path.join(imgPath, `/temp/${groupId}and${userId}.jpg`))
    } else {
        await sharp(path.join(imgPath, `/background/${imgName}`))
            .resize({
                width: 1854,
                height: 1088
            })
            .extend({
                bottom: height,
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1
                }
            })
            .composite([{
                input: svgBuffer,
                top: 1088,
                left: 0
            }])
            .flip()
            .toFile(path.join(imgPath, `/temp/${groupId}and${userId}.jpg`))
    }

}

module.exports.createSignInImg = createSignInImg