/*
GET to get info
POST to send data to db
PUT  to edit our data
PATCH  to update user 
DELETE  to delete user from db
*/


const http=require("http");
const fs=require("fs");

const myserver=http.createServer((req,res)=>{
    res.end("This our  server");
});

myserver.listen(3000,()=>{
    console.log("Server Started");
});