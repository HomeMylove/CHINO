const Dbc = require('./utils/utils/Dbc')


const dbc = new Dbc();


async function test(){
    // const promise =await dbc.update("insert into robot_name (user_id,group_id,name) values ('123','456','Yae')");
    const promise = await  dbc.select("select * from robot_name")
    console.log(promise)
    dbc.close()
}

test()


