const express=require('express');
const app=express();

const session = require('express-session');//this is to make the session 


app.use(session({secret:"mysecretestring",resave:false,saveUninitialized:true}));// now by this we can see the exernsl cookie in out applicaton in the inspect that is the connect_sid which is our session id cookie by using the express sessions  


//RESAVE and SAVEUNINTIALIZED

// The resave and saveUninitialized options in the express-session middleware control how sessions are handled in your Express application. Here's a brief explanation of each:
// resave:
// When set to true, the session will be saved back to the session store, even if it was never modified during the request. This can be useful if you want to ensure that the session is always updated, but it can lead to unnecessary writes to the session store.
// When set to false, the session will only be saved if it was modified during the request. This is generally recommended to avoid unnecessary session store writes.
// saveUninitialized:
// When set to true, a new session will be saved to the store even if it is never modified. This means that a session will be created for every request, regardless of whether the user has logged in or performed any actions.
// When set to false, a new session will only be saved if it is modified. This is useful for reducing the number of sessions created for users who do not log in or interact with the application.
// In summary, setting resave to false and saveUninitialized to false is a common practice to optimize session management and reduce unnecessary writes to the session store.

app.get("/test",(req,res)=>{
    res.send("test suucesssful");
})



//Byt this is we are storing the value of the session count whn we write this we can store that how many times we visited the website when we open it in the same browser it will give the same result and continues from where we stop 
app.get("/requestcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count=1;
    }
    res.send(`You send a request ${req.session.count} times`);
});


app.get("/getname",(req,res)=>{
let {name="anoymus"}=req.query;
req.session.name=name;
res.send(name);
});


app.get("/hello",(req,res)=>{
    res.send(`Hello ${req.session.name}`);
});






app.listen(8080,()=>{
    console.log("Port listing on the port 8080");
});