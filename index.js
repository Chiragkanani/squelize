const express = require("express");
const userController = require("./controllers/userController");
const app = express();

require("./models/index");

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/adduser",userController().addUser)
app.get("/users",userController().getUser)
app.get("/users/:id",userController().getSingleUser);
app.delete("/users/:id",userController().deleteUser);
app.put("/users/:id",userController().updateUser);
app.get("/findorcreate",userController().findOrCreate);
app.get("/get-set-virtual",userController().getSetVirtual);
app.get("/rowquery",userController().rowQuery);
app.get("/one-to-one",userController().oneToOneUser);
app.get("/one-to-many",userController().oneToManyUser);
app.get("/many-to-many",userController().manyToMany);
app.get("/eagerloading",userController().eagerLoading);
app.listen(3000);