//we interact with file we use fs module 
const fs=require("fs");

//Writing
// Sysnc this will write Hey there in the test.txt file
fs.writeFileSync('./test.txt','Hey there');


//Async
fs.writeFile('./test.txt',"Hello world Async",(err)=> {})


//Reading

//Sync
const result=fs.readFileSync('./contact.txt',"utf-8");//utf-8 means it is asking about how to encode the file so tell it that it is the simple string file i have given type to it
console.log(result);

//Async
fs.readFile("./contact.txt","utf-8",(err,result)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("This is the Async ",result);
    }
})

//Difference
//Sync will return something but Async didn't return anything but it need a callback that if result it will give else error it will shoe that 


//Sync
//append will never override the thing it will add it next to it 
fs.appendFileSync("./contact.txt",new Date().getDate().toLocaleString());//this will add date

//copying the file from contact to copy
fs.cpSync("./contact.txt","./copy.txt");


//delete file
//fs.unlinkSync("./copy.txt");

//file status give its Kundli
console.log(fs.statSync("./contact.txt"));

//make dir
//fs.mkdirSync("my-docs");


//this will make the dir in dir inside it recursively
//fs.mkdirSync("my-docs/a/b",{recursive:true});