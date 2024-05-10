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

app.listen(3000);