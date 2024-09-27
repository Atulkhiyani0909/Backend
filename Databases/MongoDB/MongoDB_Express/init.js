const mongoose=require("mongoose");
const Chat = require("./models/chat");
main().then(()=>{
    console.log("Successful");
}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Chatter');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }


 let allChat=([
    {
from:"Rohan",
to:"Sojan",
msg:"How are you",
created_at:new Date()
},
{
    from: "Alice",
    to: "Bob",
    msg: "Hey, how's your day going?",
    created_at: new Date()
  },
  {
    from: "Liam",
    to: "Emma",
    msg: "Are you free to chat later?",
    created_at: new Date()
  },
  {
    from: "Sophia",
    to: "Noah",
    msg: "Just finished reading a great book!",
    created_at: new Date()
  },
  {
    from: "Mia",
    to: "Oliver",
    msg: "Do you want to grab lunch tomorrow?",
    created_at: new Date()
  },
  {
    from: "Ava",
    to: "Lucas",
    msg: "Did you see the latest episode of that show?",
    created_at: new Date()
  }
  

])

Chat.insertMany(allChat);