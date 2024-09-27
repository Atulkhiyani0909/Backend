//status codes
//middlewares
//routes


const express=require("express");
const app=express();
let users=require("./MOCK_DATA.json");
const fs=require("fs");


//middlewares learning
app.use(express.json());
app.use(express.urlencoded({extended:false}));//this is the middleware this give the form data in the body
const port=8000;

//creating our own middlewares
app.use((req,res,next)=>{
    console.log(req.ip);//on local host it will give 1 but on the real it will give the ip og the user real
     console.log("Hello from midddle ware 1") 
     req.name="Atul";
    next(); 
});

app.use((req,res,next)=>{
    console.log("Hello from middle ware 2",req.name);//req.name is going to pass on as next function moves it further to the another fun
    next();
});










//Routes
app.get("/api/users",(req,res)=>{
    res.setHeader("X-myname","Atul");//my created header always add x to custom headers
        console.log(req.header);
    return res.json(users);
});

app.get("/users",(req,res)=>{
 const html=
 `<ul>
 ${users.map((user)=>`<li>${user.first_name}<li>`).join("")};
 <ul>`;
res.send(html);
});

//app.route().get().put().patch().delete();

app.get("/api/users/:id", (req, res) => {
    console.log(req.params.id);
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ message: "User not found" });
    }
});

app.post("/api/users",(req,res)=>{
    //create new user;
    const body=req.body;
    res.status(400,{msg:'Bad request'});
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
         return res.json({status:"Success", id:users.length});
    });
   
});   


app.delete('/api/users/:id', (req, res) => {//delete and give data back to the file 
    const userId = parseInt(req.params.id, 10);

    // Find the index of the user with the given ID
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        // User not found
        return res.status(404).json({ status: 'Error', message: 'User not found' });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Write the updated users array back to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            // Handle file write error
            return res.status(500).json({ status: 'Error', message: 'Failed to update the file' });
        }
        // Respond with success
        res.json({ status: 'Success', message: 'User deleted successfully' });   
    });
});


















app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});