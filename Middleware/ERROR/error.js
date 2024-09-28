const express = require("express");
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError");




const checkAdmin = (req,res,next)=>{
    let {password} = req.query;
    if(password === "admin"){
        next();
    }else{
        throw new ExpressError(401,"You must be an admin to access this route");
    }
}

app.get("/admin",checkAdmin,(req,res,next)=>{
    try{
        console.log("You are an admin");
        res.send("You are an admin");
    }catch(err){
        next(err);
    }

});

app.use((req,res,next)=>{
    const err = new ExpressError(404,"Page not found");
    next(err);
});

app.use((err,req,res,next)=>{
    let {status=500 ,message="Something went wrong"} = err;
    res.status(status).send(message);
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

