const express=require('express');
const app=express();


const http=require('http'); //because the socket io runs on the http server to run 
const socketio=require('socket.io');
const path=require('path');



const server=http.createServer(app);//this help to make the http server and now we can run the socket.io 
const io=socketio(server);//passing out server to the socketio 
//socketio and server connect now 


app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname,'public')));

//on the connection for the realtime
io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        console.log(data);
        io.emit("receive-location",{id:socket.id,...data});
    });

    socket.on("user-disconnect",()=>{
      io.emit("user-disconnect",socket.id);
    });
    console.log("connected");
});

app.get('/',(req,res)=>{
    
    res.render("index");
});

server.listen(8080,()=>{
    console.log('app is runing on the port 8080');
})