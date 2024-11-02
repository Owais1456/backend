import 'dotenv/config'
import express from 'express';
import { data } from './data.js';
import chalk from 'chalk';
import mongoose from 'mongoose';
import Item from './models/postmodel.js';
import bcrypt from 'bcrypt'
import users from './models/userspost.js';
import cors from 'cors'







const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

const owais = process.env.MONGODB_URI;

mongoose.connect(owais)

mongoose.connection.on("connected", () => console.log("mondodb conted"))
mongoose.connection.on("error", (err) => console.log(err))

// ALL PRODUCTS API

// app.get("/products",(request,response)=>{
//     response.send(data)
// })




// SIGLE API PRODUCTS GET METHOD

// app.get("/products/:id",(request,response)=>{
//     // response.send(data)
//      const single =   request.params.id;
//      const fil = data.filter((e,i)=> e.id == single)

//      response.send(fil)
//      return
// })



// ALL IN ONE API


app.get("/products", (request, response) => {
    const single = request.query.id;
    if (request.query.id) {
        const fil = data.filter((e, i) => e.id == single)

        response.send(fil)
        return
    }

    response.send(data)
})




app.get("/", (request, response) => {
    response.send("owais")
})

app.get("/users", (request, response) => {
    response.send({
        name: "owais",
        age: 20,
    })
})


app.get("/owais", (request, response) => {
    // response.send("ok")
})


// API METHODS

// create ====>post
// read ====>get
// update ====>put
// deled ====>deleted


// POST API

app.get("/getpost", (req, res) => {
    res.json({
        messege: "running",
        status: true
    })

})

app.post("/createpost", async (req, res) => {
    const { tittle, desc, postId } = req.body;
    if (!tittle || !desc || !postId) {
        res.json({
            messege: "11111"
        })
        return;
    }
    const obj = {
        tittle,
        desc,
        postId,
    }

    const response = await Item.create(obj)

    res.json({
        messege: "succefully",
        data: response
    })
res.send("create post")
})



app.put("/updatepost", async(req,res)=>{
    const {tittle,desc,postId} = req.body

    console.log(tittle,desc,postId)

    const update = await  Item.findByIdAndUpdate(postId,{tittle,desc})

    res.json({
        messege:"post ok",
        data: update

    })
})


app.delete("/deletpost/:id",async(req,res)=>{
        const params =req.params.id

        await Item.findByIdAndDelete(params);

        res.json({
            messege:"post ok",
            

            
})

        
})


app.post("/signup",async(req,res)=>{
        const {fristName,lastName,email,password} = req.body

        if(!fristName || !lastName || !email || !password){
            res.json({
                messege:"fail",
                status:false,
            })
            return
        }


        const emailek = await users.findOne({ email });

  console.log("emailExist", emailek);

  if (emailek !== null) {
    res.json({
      message: "email already been registered",
      status: false,
    });

    return;
  }

        

        const hash = await  bcrypt.hash(password,10)

        console.log(hash)

        let obj ={
            fristName,
            lastName,
            email,
            password:hash
        }

        const create = await users.create(obj)

        res.json({
            messege:"sucfiy",
            status:true
        })

})



app.post("/login", async(req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        res.json({
            messege:"missing",
            status:false
        })
        return
    }

    const emailok = await users.findOne({email})

    if(!emailok){
    res.json({
        messege:"invalid password",
        status:false
    })
    return

    }

    const password1 = await bcrypt.compare(password,"$2b$10$yNRojys/LujSlEK1AridxOfghN0veBK8Igq9plnDDAxC2SsujGeBG")

    if(!password1){
        res.json({
            messege:"invalid password",
            status:false
        })

        return
    }

    res.json({
        messege:"ok login",
        status:true
    })
})


// app.post("/api/post",(req,res)=>{
//     console.log(req.body)
//     res.send("create post")

// })
// app.put("/api/post",(req,res)=>{
//     res.send("update post")

// })
// app.delete("/api/post",(req,res)=>{
//     res.send("deled post")

// })






// PORT
app.listen(process.env.POQT, () => {

    console.log(chalk.red.bgWhite.underline(
        "owais"))
})








