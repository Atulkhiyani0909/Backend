const express=require('express');
const app=express();
const path=require('path');


const session = require('express-session');//this is to make the session 
const flash=require('connect-flash');//we are requiring the flash for our pop up message after some work done and then that message will be deleted from the memory we have to use the sessions before usings thr sessions 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(session({secret:"mysecretestring",resave:false,saveUninitialized:true}));

app.use(flash());


// ... existing code ...
app.use((req,res,next)=>{
    res.locals.successMsg=req.flash('success'); // Changed from req.locals to res.locals
    res.locals.errorMsg=req.flash('error');     // Changed from req.locals to res.locals
    next();
});
// ... existing code ...


app.get("/getname",(req,res)=>{
    let {name="anoymus"}=req.query;
    req.session.name=name;
    if(name=="anoymus"){
        req.flash('error',"not registered");
    }else{
        req.flash('success',"user registered");
    }
   res.redirect("/hello");
    });


app.get("/hello",(req,res)=>{
    res.render("display.ejs",{name:req.session.name});
 });
    

 app.listen(8080,()=>{
    console.log("Running Successfully");
 })