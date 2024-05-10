const db = require("../models/index")

const userController = ()=>{
    return {
        async addUser(req,res){
            let jane = await db.user.create({firstName:"Jane"});
            console.log(jane.toJSON());
            return res.json(jane)
        }
    }
}

module.exports = userController;