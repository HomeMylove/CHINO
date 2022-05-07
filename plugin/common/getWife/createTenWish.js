const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const request = require('request')

// 基本绝对路径
const imgPath = path.join(__dirname, '../../../../data/images/wives')

/**
 * @function 制作图片
 * @param {*} results
 * @param {number} groupId 用于生成图片名 
 * @param {number} userId 用于生成图片名
 */
module.exports = async(results, groupId, userId, res) => {
    // 获取十次的结果
    //[CQ:image,file=https://gchat.qpic.cn/gchatpic_new/3054976457/1009880440-2165170871-A3B111289B7E7B44300770EDCFF550F8/0?term=3]

    const reg = /gchatpic_new(.+)\/0\?term/



    const wives = []
    for (let i = 0; i < 10; i++) {
        const wife = results[Math.floor(Math.random() * results.length)]
        const result = wife['url'].match(reg)
        if (!result) {
            return
        }
        wife['name'] = result[1].replace(/[\/|\-]/g, '')
        wives.push(wife)
    }

    // 下载并裁剪图片，调整大小
    const quene = wives.map(async(item) => {

        return new Promise((resove, reject) => {

            if (fs.existsSync(path.join(imgPath, `avaters/${item['name']}.jpg`))) {

                return resove()
            }
            request(item['url']).pipe(fs.createWriteStream(path.join(imgPath, `raw/${item['name']}.jpg`)).on('close', () => {

                resove(item['name'])

            }))
        }).then(
            async img => {
                if (!img) return
                const metadata = await sharp(path.join(imgPath, `raw/${img}.jpg`)).metadata()
                let { height, width } = metadata
                let left, top, w, h
                if (height < width * 1.5) {
                    h = height
                    w = Math.round(height * 2 / 3)
                    left = Math.round((width - w) / 2)
                    top = 0
                } else {
                    w = width
                    h = Math.round(w * 1.5)
                    left = 0
                    top = Math.round((height - h) / 2)
                }

                // const svgImage = `
                //     <svg width="140" height="210">
                //     <style>
                //     .title { fill: #fff; font-size: 20px; font-weight: bold;}
                //     <font>
                //     <font-face font-family="SimSun SimHei YouYuan"/>
                //     </font>
                //     }
                //     </style>
                //     <text x="70" y="200" text-anchor="middle" class="title">${img}</text>
                //     </svg>
                //     `

                // const svgBuffer = Buffer.from(svgImage)

                return await sharp(path.join(imgPath, `raw/${img}.jpg`))
                    .extract({ width: w, height: h, top, left })
                    .resize({ width: 140 })
                    // .composite([{
                    //     input: svgBuffer,
                    //     top: 0,
                    //     left: 0
                    // }])
                    .toFile(path.join(imgPath, `avaters/${img}.jpg`))
            }
        ).catch(error => {
            console.log('creatTenWish', error);
        })
    })

    return Promise.all(quene).then(
        async() => {
            // 创建叠加层
            const cover = []
            for (let i = 0; i < wives.length; i++) {
                const img = {
                    input: path.join(imgPath, `avaters/${wives[i]['name']}.jpg`),
                    left: 62 + (i % 5) * 190,
                    top: 80 + (i < 5 ? 0 : 330)
                }
                cover.push(img)
            }
            cover.push({
                input: path.join(imgPath, 'bg', 'cover.jpg'),
                top: 0,
                left: 0
            })

            await sharp(path.join(imgPath, 'bg', 'bg.jpg'))
                .composite(cover)
                .toFile(path.join(imgPath, 'temp', `${groupId}${userId}.jpg`))
                .then(
                    () => {
                        res.sendMsg({
                            groupId,
                            msg: `[CQ:at,qq=${userId}]你的十连如下`,
                            imgUrl: `wives/temp/${groupId}${userId}.jpg`
                        })
                    }
                )

        }
    ).catch(error => {
        console.log("十连wife失败", error)
    })
}