const express=require('express');


//this is neccesary to write as we are making the express routes in out other file and using them in another file 

const router=express.Router();
//like /users is common in all of the them write it in the app.use in main file 


//we removed /users from al of them as it is common for all 

router.get("/",(req,res)=>{
    res.send("this is the users index path");
});
router.get("/:id",(req,res)=>{
    res.send(`this is the users path for id: ${req.params.id}`);
});
router.get("/new",(req,res)=>{
    res.send("this is the users new path");
});


module.exports=router;