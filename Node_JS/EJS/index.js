const express=require("express");
const app=express();//express auto require ejs internally
const path=require("path");



//ejs setting 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.send("Root path");
})

//res.render in ejs
app.get("/home",(req,res)=>{
    let num=Math.floor(Math.random()*6)+1;
    res.render("home.ejs",{random:num});//sending our data to home.ejs file our key random is now accessable in the home.ejs file 
});

app.listen(8000,()=>{
    console.log("app is listening on the port 8000");
});