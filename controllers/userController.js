const db = require("../models/index")
const User = db.user
const { Op } = require('sequelize');
const userController = ()=>{
    return {
        async addUser(req,res){
            let jane;
            if (Array.isArray(req.body)) {
                 jane = await User.bulkCreate(req.body);
            }else{
                 jane = await User.create(req.body,{
                    // fields:['firstName']
                });
            }

           
            // jane.set(
            //     { firstName: "Jane",
            //         lastName:"Kanani"
            //      }
            // );
            // await jane.save();
            // await jane.destroy();
            // await jane.reload()
            // console.log(jane.lastName);
            return res.json(jane)
        },
        async getUser(req,res){
            try {
                let users = await User.findAll({
                    // attributes:{
                    //     // include:[[db.sequelize.fn('MAX', db.sequelize.col('id')), 'count']]
                    // }
                    attributes:[["id","RollNo"],"firstName","lastName",[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],"fullName"],
                    // where:{
                    //     [Op.or]:[{id:{[Op.in]:[3,4]}},{firstName:{[Op.like]:"%hi%"}}],
                    //     lastName:"Kanani"
                    // }
                    // where:{
                    //     id:{[Op.notBetween]:[3,5]}
                    // },
                    // order:[["id","DESC"]],
                    group:"id",
                    // offset:2,
                    // limit:2

                });
                return res.json(users)
            } catch (error) {
                console.log(error)
            }
        },
        async getSingleUser(req,res){
            try {
                let users = await User.findByPk(req.params.id,{
                    attributes:[["id","RollNo"],"firstName","lastName"]
                });
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
        },
        async updateUser(req,res){
            try {
                let result = await User.update(req.body,{where:{id:req.params.id}});
                console.log(result)
                res.json(result)
            } catch (error) {
                console.log(error)
            }
        },
        async findOrCreate(req,res){
            try {
                    const {count, rows} = await User.findAndCountAll({
                    // where: req.body,
                    attributes:[["id","RollNo"],"firstName","lastName"]
                  });
                return  res.json({count,rows})
            } catch (error) {
                console.log(error)
            }
        },
        async getSetVirtual(req,res){
            try {
                let data = await User.findAll();

            return res.json(data)
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = userController;