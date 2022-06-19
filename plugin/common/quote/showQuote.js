const fs = require('fs')
const path = require('path')
const {chi} = require("pinyin/data/dict-zi-web");

const imgPath = path.join(__dirname, '../../../../data/images/quote')

// useWeight 是否优先展示最后添加的语录
// 需要为语录排序
const useWeight = true


/**
 * @function 返回一张群语录
 * @param {*} req
 * @param {*} res
 * @returns
 */
module.exports = (req, res) => {
    const {groupId} = req
    const groups = fs.readdirSync(imgPath)
    if (groups.indexOf(groupId.toString()) !== -1) {
        let imgs = fs.readdirSync(path.join(imgPath, groupId.toString()))

        let img
        if (useWeight) {
            imgs.sort((a,b)=>parseInt(a)-parseInt(b))

            const LEN = imgs.length   // 总长
            const STEP = 10           // 步长
            const RANKS = Math.ceil(LEN / STEP)   // 层级
            const ALL = (1 + RANKS) * RANKS / 2     // 和

            let count = 0
            let index
            const randInt = Math.random()
            for(let i = 1; i <= RANKS; i++){
                count += i
                if((count/ALL) >= randInt){
                    index = i
                    break
                }
            }

            const end = LEN - RANKS * STEP + index * STEP
            const start = end - 10 < 0 ? 0 : end - 10

            const child = imgs.slice(start,end)
            img = child[Math.floor(Math.random() * child.length)]

        } else
            img = imgs[Math.floor(Math.random() * imgs.length)]


        res.sendMsg({
            groupId,
            imgUrl: path.join('/quote', groupId.toString(), img)
        })
    } else {
        return res.sendMsg({
            groupId,
            msg: '本群暂时没有群语录,请向我的主人投稿吧'
        })
    }
}