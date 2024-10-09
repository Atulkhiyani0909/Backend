const express=require('express');

//by aquring this we are no making the messy to our file by users and posts routes we are writing in them in another file and aquaring them in this file 
const users=require("./routes/user");
const posts=require("./routes/post");


const app=express();


//root path
app.get("/",(req,res)=>{
    res.send("this is the root path");
});


//by this we are making that all routes startng from the / first go to the these users and post routes
app.use("/users",users);
app.use("/posts",posts);

//index -route




//----like the above routes we have many more routes like that 


app.listen(3000,()=>{
    console.log("server is listineng to the port 3000")
});
