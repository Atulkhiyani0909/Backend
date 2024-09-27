 //we have added start in the package.json file so when we write npm start it will run
 
 const os=require("os");//this will give the info of our opersting system
 console.log(os.cpus().length);//length how many threads     


 console.log("Hello Node ");

const math=require('./math');
const {add,sub}=require('./math');//diff ways to exports

console.log(add(4,54));

console.log(math.add(4,54));
console.log(math.subfn(4,54));


//there are lot of inbuilt modules in node which we can use 
//like
/*
crypto
https
and many more .......
*/



