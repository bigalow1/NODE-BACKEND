import e from "express";
import path from 'path';
import { fileURLToPath } from "url";
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from "dotenv";
config()
import { del1post, createPost, get1post, getAllpost, update1post } from "./controllers/postController.js";
// import { forSignup } from "./controllers/userController.js";
// const express = require('express');
// const path = require('path');
const app = e();
const port = process.env.PORT || 3500 ;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(()=>console.log("Mongodb connected successfully")) 
    .catch((err)=>console.log("Mongodb connection failed", err))
app.use(cookieParser());


app.use(e.json());
app.use(e.urlencoded({extended:true}))

app.use(e.static('./box'))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'box','index.html'))
})

app.use('/user',userRoutes)

app.use('/post', postRoutes)
app.use('/comment', commentRoutes)


// app.post('/create',(req,res)=>{
//     let {firstname,lastname,email,password} = req.body

//     let myTable = `
        
//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${firstname}</td>
//                 <td>${lastname}</td>
//                 <td>${email}</td>
//                 <td>${password}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })

// app.post('/create',(req,res)=>{
//     let myTable = `
        
//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${req.body.firstname}</td>
//                 <td>${req.body.lastname}</td>
//                 <td>${req.body.email}</td>
//                 <td>${req.body.password}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })


// app.get('/about',(req,res)=>{
//     res.sendFile(path.join(__dirname,'box','about.html'))
// })

// app.post('/create',(req,res)=>{
//     let {firstname,lastname,email,password,age,gender} = req.body

//     let myTable = `
        
//     <table border="1">
//         <thead>
//             <tr>
//                 <th>FirstName</th>
//                 <th>LastName</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>${firstname}</td>
//                 <td>${lastname}</td>
//                 <td>${email}</td>
//                 <td>${password}</td>
//                 <td>${age}</td>
//                 <td>${gender}</td>
//             </tr>
//         </tbody>
//     </table>
//     `

//     res.send(myTable)
// })



app.listen(port,()=>{
    console.log(`server is runninng on port : ${port}`)
    // console.log("server is running on port " + port)
})
