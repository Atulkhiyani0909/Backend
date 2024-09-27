const http=require("http");
const fs=require("fs");
const url=require("url");




const myserver=http.createServer((req,res)=>{
    //console.log(req.headers);
    const date = new Date();
    
    const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const currentDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
const currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const log=`${currentDate}, ${currentTime},${req.url},${req.method}\n`;
    const myurl=url.parse(req.url,true);//this will givw all the infirmation about our url
    console.log(myurl);
    
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myurl.pathname)
        {
            case '/':
                res.end(" This Home page");
            break;
            case '/about':
                const username=myurl.query.myname; 
                res.end(`Hi ${username} how are you`);
            break;
            default:
                res.end("404 Not found");
        }
    });
});

myserver.listen(8000,()=>console.log('Server Started'));
