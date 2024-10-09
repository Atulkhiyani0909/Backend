const express=require('express');

const cookieParser=require('cookie-parser');// to read the values of the cookies

const app=express();
//cookies are very use full they help to store the little amount of data to be stored on the user system 
//cookies help in authntication and authorization

//to use cookie parser
app.use(cookieParser());


 app.use(cookieParser({ secret: 'your-secret-key' }));// this is the secrete key for our cookie signed cookie doesn't store the cookie value directly but save like the use of the secret key in encrypted format



// In this we will learn how to send cookies to the user 

app.get("/getcookies",(req,res)=>{
    res.cookie("MadeIn","India");
    res.cookie("great","hello-user");
    res.send(' send you some cookies');
});


app.get("/greet",(req,res)=>{
    let {name="anonymous"}=req.cookies;//this is will read if the name value is there in the cookie in system than run Hi name .
    res.send(`Hi , ${name}`);
})


// ... existing code ...

app.use(cookieParser({ secret: 'your-secret-key' })); // Ensure cookie parser is set up for signed cookies


//this is the signed cookie 
app.get("/getcookies", (req, res) => {
    res.cookie("MadeIn", "India", { signed: true }); // Set a signed cookie
    res.cookie("great", "hello-user", { signed: true }); // Set another signed cookie
    res.send('Sent you some signed cookies');
});

app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.signedCookies; // Read signed cookies
    res.send(`Hi, ${name}`);
});



app.get("/",(req,res)=>{
    console.dir(req.cookies);//to read the values of the cookies
    res.send("this is the root path");
});


app.listen(3000,()=>{
    console.log("app listining on the port 3000");
})