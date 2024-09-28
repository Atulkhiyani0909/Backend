const express = require("express");
const app = express();
const port = 3000;
const ExpressError = require("../ERROR/ExpressError");


//our custom error
app.get("/admin",(req,res,next)=>{
    throw new ExpressError(403,"Access denied");
}); 

app.use((err,req,res,next)=>{
    let {status=500 ,message="Something went wrong"} = err;
    res.status(status).send(message);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
