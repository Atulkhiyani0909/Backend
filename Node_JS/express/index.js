const express=require("express");


const app=express();

app.get("/",(req,res)=>{
    console.log("New");
     res.send("Hello from home page");
});

app.get("/about",(req,res)=>{
    console.log("New");
    res.send("Hello from about page");
});

const port=3000;
app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});