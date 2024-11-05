const express =require("express")
const cors = require("cors")
const bodyparser=require("body-parser")
const jwt=require("jsonwebtoken")

const app=express()
const port=5000
const secret_key="jwt_secret_key"

app.use(cors())
app.use(bodyparser.json())

const users={
    username:"sree",
    password:"sree123",
};

app.post("/login",(req,res)=>{
    const {username,password}=req.body
    if(username===users.username && password===users.password){
        const token=jwt.sign({username},secret_key);
        return res.status(200).json({message:"login succesfull",token})
    }else{
        return res.status(403).json({message:"invalid creditials"});
    }
})

app.get("/dashboard",(req,res)=>{
    const token=req.headers["authorization"];
    if(!token) return res.status(300).json({message:"token required"})
        jwt.verify(token,secret_key,(err,decoded)=>{
    if(err) return res.status(402).json({message:"invalid token"})
        res.status(203).json({message:`welcome to dasboard ${decoded.username}`})
    });
});

app.listen(port,()=>{
    console.log(`servar running on port ${port}`);
    
});