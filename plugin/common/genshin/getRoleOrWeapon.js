const path = require('path')


const mapImg = require('./map.json')


/**
 * @function 获取信息
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

module.exports = (req, res) => {
    const { groupId, sender, rawMsg } = req

    const name = rawMsg.replace('info', '').replace('信息', '').trim()

    console.log("name" + name);



    for (let i = 0; i < mapImg.length; i++) {
        if (mapImg[i].oldName.indexOf(name) == 0) {
            return res.sendMsg({
                groupId,
                imgUrl: path.join('genshin', mapImg[i].path)
            })
        }
    }
    console.log("没有");


}