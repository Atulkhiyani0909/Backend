const express=require("express");
const app=express();
const fs=require("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let port=3000;
app.listen(port,()=>{
    console.log(`App listening on the port ${port}`);
});

const path=require("path");
const social_data=require("./MOCK_DATA.json");
app.use(express.urlencoded({extended:true}));


app.set("views engine","ejs");

app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.static(path.join(__dirname,"public/css")));
app.get("/",(req,res)=>{
    res.send("Home page");
});

app.get("/social/:username",(req,res)=>{
    let {username}=req.params;
    const user = social_data.find((user) => user.first_name === username);
    if(user){
        res.render("social.ejs",{user});
    }else{
        res.send(`No user with ${username}  found`)
    }
});

app.post("/social/new",(req,res)=>{

    let body=req.body;
    console.log(req.body);
    social_data.push({...body,id:uuidv4()});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(social_data),(err,data)=>{
        res.redirect("/");
   });
});


app.delete("/delete/:id",(req,res)=>{
    const id=req.params.id;
    const user=social_data.findIndex((users)=>users.id===id);

    if (user === -1) {
        // User not found
        return res.status(404).json({ status: 'Error', message: 'User not found' });
    }

    // Remove the user from the array
    social_data.splice(user, 1);

    // Write the updated users array back to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(social_data), (err) => {
        if (err) {
            // Handle file write error
            return res.status(500).json({ status: 'Error', message: 'Failed to update the file' });
        }
        // Respond with success
        res.json({ status: 'Success', message: 'User deleted successfully' });   
    });
})