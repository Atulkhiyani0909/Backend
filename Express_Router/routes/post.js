const express=require('express');


const router=express.Router();

//we removed /users from al of them as it is common for all 

router.get("/",(req,res)=>{
    res.send("this is the posts index path");
});
router.get("/:id",(req,res)=>{
    res.send(`this is the posts path for id: ${req.params.id}`);
});
router.get("/new",(req,res)=>{
    res.send("this is the posts new path");
});


module.exports=router;