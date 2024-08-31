const express = require('express')
const cors = require('cors')
require('dotenv').config();
const authRouter = require('./routers/userRouter')
const postRouter = require('./routers/postRouter')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')


main().catch(err => console.log(err));



async function main() {
  await mongoose.connect(`mongodb+srv://sehdevaditya:${process.env.DB_PASSWORD}@cluster0.5l8ob.mongodb.net/blogsDB`);
    console.log("connected to DB")
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const server = express()


server.use(cors({credentials:true,origin:`http://localhost:${process.env.FRONTEND_PORT}`}))
server.use(express.json())
server.use(cookieParser())
server.use('/uploads',express.static(__dirname + "/uploads"))
server.use("/api/auth",authRouter.router)
server.use('/api/post',postRouter.router)


const port = process.env.BACKEND_PORT || (3000)


server.listen(port,()=>{
    console.log("server started for blog project")
})


