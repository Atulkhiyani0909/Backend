const mongoose=require("mongoose");

const chats=new mongoose.Schema({
from:{
    type:String,
    required:true,
},
to:{
    type:String,
    required:true,
},
msg:{
    type:String,
    maxLength:100,
},
created_at:{
    type:Date,
    required:true,
},
});


const Chat=mongoose.model("Chat",chats);

module.exports=Chat;