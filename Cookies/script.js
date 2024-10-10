const express = require('express');
const cookieParser = require('cookie-parser'); // to read the values of the cookies

const app = express();

// Use cookie parser with a secret key for signed cookies
app.use(cookieParser( "HiddenCode")); // Ensure this is a valid non-empty string  for making our cookies signed and save 

// In this we will learn how to send cookies to the user 
app.get("/getcookies", (req, res) => {
    res.cookie("MadeIn", "India"); // Set a signed cookie
    res.cookie("great", "hello-user"); // Set another signed cookie
    res.send('Sent you some cookies');
});

app.get("/greet", (req, res) => {
    // Ensure you are reading the correct cookie name
    let { great = "anonymous" } = req.cookies; // Read the 'great' cookie
    res.send(`Hi, ${great}`); // Respond with the value of the 'great' cookie
});

// This is the signed cookie 
app.get("/get", (req, res) => {
    res.cookie("name", "I", { signed: true }); // Set a signed cookie
    
    res.send('Sent you some signed cookies');
});

app.get("/greetsignedcookie", (req, res) => {
    let { great = "anonymous" } = req.signedCookies; // Read the 'great' signed cookie
    res.send(`Hi, ${great}`); // Respond with the value of the 'great' cookie
});

app.get("/", (req, res) => {
    console.dir(req.cookies); // To read the values of the cookies
    res.send("This is the root path");
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});