const db = require("../models/index")
const User = db.user
const userController = ()=>{
    return {
        async addUser(req,res){
            let jane;
            if (Array.isArray(req.body)) {
                 jane = await User.bulkCreate(req.body);
            }else{
                 jane = await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });
            }

           
            // jane.set(
            //     { firstName: "Jane",
            //         lastName:"Kanani"
            //      }
            // );
            // await jane.save();
            // await jane.destroy();
            // console.log(jane.toJSON());
            return res.json(jane)
        },
        async getUser(req,res){
            try {
                let users = await User.findAll();
                return res.json(users)
            } catch (error) {
                console.log(error)
            }
        },
        async getSingleUser(req,res){
            try {
                let users = await User.findOne({where:{id:req.params.id}});
                return res.json(users)
            } catch (error) {
                console.log(error)
            }
        },
        async deleteUser(req,res){
            try {
                let result = await User.destroy({where:{id:req.params.id}});
                res.json(result)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userController;