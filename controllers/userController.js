const db = require("../models/index")
const User = db.user;
const Contact = db.contact
const Education = db.education
const { Op,QueryTypes } = require('sequelize');
const userController = ()=>{
    return {
        
        async addUser(req,res){
            try {
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
            } catch (error) {
                console.log(error)
            }
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
                    // limit:2,
                    // paranoid:false  //for soft deleted data

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
                let result = await User.destroy({
                    where:{id:req.params.id},
                    // force:true     // for soft delete
                });

                //restore data = make deletedAt isnull  
                // await User.restore({
                //     where: { id: req.params.id },
                // });

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
        },
        async rowQuery(req,res){
            try {
                const results = await db.sequelize.query('select * from Users where id in(?)',
                {
                    type: QueryTypes.SELECT,
                    replacements:[[1,3,4]],
                    model: User,
                    mapToModel: true,
                    // plain:true
                });
                return res.json({results})
            } catch (error) {
                console.log(error)
            }
        },
        async oneToOneUser(req,res){
            try {
                let data = await User.create({
                    firstName:"Chirag",
                    lastName:"Kanani",
                    email:"hello2@gmail.com"
                });
                let contactDetail
                if (data && data.id) {
                     contactDetail = await Contact.create({
                        permanent_address:"Bhvsnshr",
                        current_address:"sihor",
                        UserId:data.id
                    });
                }
                // let data = await User.findAll({
                //     include:[{
                //         model:Contact,
                //         as:"contactDetails",
                //         // attributes:["permanent_address","current_address"],
                //         // where:{id:2}
                //     }],
                // });


                // let data = await Contact.findAll({
                //     include:[{
                //         model:User,
                //         as:"UserDetails",
                //         // attributes:["permanent_address","current_address"],
                //         // where:{id:2}
                //     }],
                // });
                return res.json({data})
            } catch (error) {
                console.log(error)
            }
            
        },
        async oneToManyUser(req,res){
            try {
                //  let contactDetail = await Contact.create({
                //         permanent_address:"Bhvsnshr",
                //         current_address:"sihor",
                //         UserId:1
                //     });

                let data = await User.findAll({
                    include:[{
                        model:Contact,
                        as:"contactDetails",
                    }]
                })
                
                return res.json({data})
            } catch (error) {
                console.log(error)
            }
            
        },
        async manyToMany(req,res){
            // let data = await User.findAll({
            //     include:[{
            //         model:Contact
            //     }]
            // })
            let data = await Contact.findAll({
                include:[{
                    model:User,
                    through:{
                        attributes:[]
                    }
                }],
            })
            return res.json(data)
        },
        async eagerLoading(req,res){
            try {
                let data = await User.findAll({
                    // include:{all:true,nested:true},
                    include: [{
                        model: Contact,
                        as:"contactDetails",
                        include:{
                            model:Education
                        }
                        // required:true,
                        // right:true
                    },
                    // {
                    //     model:Education,
                    //     as:"educationDetails"
                    // }
                ]
                })
                res.json({ data })
            } catch (error) {
                console.log(error)
            }
           
        }
    }
}

module.exports = userController;