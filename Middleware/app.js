const express = require('express');
const app = express();
const port = 3000;

//middleware should be written above the route handler
app.use((req,res,next)=>{//next is used to call the next middleware or the next function
console.log("This the middleware 1");
return next();
});

app.use((req,res,next)=>{
    console.log("This the middleware 2");
    return next();
    });


    //logger morgan middleware like this only
app.use((req,res,next)=>{
    req.reqTime = new Date(Date.now()).toString();
    console.log(req.method ,req.originalUrl ,req.reqTime, req.hostname , req.path);
    return next();
    });


//middleware for specific path
    app.use("/root",(req,res,next)=>{
        console.log("This the middleware 3 only for /root");
        return next();
        });


        //this is the working middleware for authentication
        app.use("/api",(req,res,next)=>{
            let {token} = req.query;
            if(token=="give_data"){
                return next();
            }else{
                return res.status(401).send("Unauthorized");
            }
            });

        app.get("/api",(req,res)=>{
            res.send("This is your data");
            });

            //passing multiple middleware
            const checkToken = (req,res,next)=>{
                let {token} = req.query;
                if(token=="123"){
                    return next();
                }else{
                    return res.status(401).send("Unauthorized");
                }
            }

            app.get("/data",checkToken,(req,res)=>{
                res.send("This is your data");
            });
            

app.get('/root', (req, res) => {
  res.send('Hello World!');
});


app.get('/',(req,res)=>{
    res.send("This the / path");
  
    });


//Error handling middleware
    //for the request to undefined path 404
app.use((req,res)=>{
    res.status(404).send("This the undefined path 404");
  
    });


//Error handling default express 
// throw new Error("This is the error");  to give our own error


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



