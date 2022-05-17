const sharp = require('sharp')
const path = require('path')
const imgPath = path.join(__dirname, '../../../../data/images/luxun')

/**
 * @function 合成luxun图片
 * @param word 语句
 * @param groupId
 * @param userId
 * @returns {Promise<void>}
 */
module.exports = async ({word,groupId,userId}) => {
    const first = word.substring(0,15)
    const second = word.substring(15)
    const width = 480
    const height = 480
    const svgImage = `
        <svg width="${width}" height="${height}">
        <style>
        <font>
        <font-face font-family="SimSun SimHei YouYuan"/>
        </font>
            .word{
                fill: white;
                font-size: 25px;
                font-family: Arial;
            }
        </style>
        <text x="50%" y="340" text-anchor="middle" class="word" >${first}</text>
        <text x="50%" y="380" text-anchor="middle" class="word" >${second || ""}</text>
        </svg>
        `
    const svgBuffer = Buffer.from(svgImage)
    await sharp(path.join(imgPath,"bg","luxun.png"))
        .composite([
            {
                input:svgBuffer,
                top:0,
                left:0
            }
        ]).toFile(path.join(imgPath,"temp",`${groupId}${userId}.png`))
}

