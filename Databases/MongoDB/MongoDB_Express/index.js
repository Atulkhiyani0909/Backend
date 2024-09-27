const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chats=require("./models/chat");

app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


main().then(()=>{
    console.log("Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Chatter');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// let chat1=new Chat({
// from:"Rohan",
// to:"Sojan",
// msg:"How are you",
// created_at:new Date()
// })

// chat1.save();
// app.listen(8000,()=>{
//     console.log("Port is listening");
// })

app.listen(8000,()=>{
    console.log("Port Running");
})


//index route
app.get("/chats",async (req,res)=>{//because it is get data from the db
   let chats= await Chats.find();//Chats where we require 
   console.log(chats);
   res.render("index.ejs",{chats});
});