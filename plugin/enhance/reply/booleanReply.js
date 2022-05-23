const reply = require('./boolean.json')

module.exports = (req,res) => {
    const {rawMsg,groupId,userId} = req

    let keys = Object.keys(reply);

    for(let i = 0; i < keys.length; i++){
        const key = keys[i]
        const result = rawMsg.match(new RegExp(key))
        if(result != null){
            res.sendMsg({
                groupId,
                msg:res.getRandomReply(reply[key])
            })
            return true
        }
    }

    return false

}