const mongoose = require('mongoose');

main().then(()=>{
    console.log('Mongoose connected');
}).catch((err)=>{
    console.log('Mongoose error');
    console.log(err);
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}



const orderSchema = new mongoose.Schema({
    quantity:Number,
    item:String,
    price:Number,
})

const Order=mongoose.model('Order',orderSchema);

// const addOrder=async()=>{
//    let result=  await Order.insertMany([
//     {
//         quantity:1,
//         item:'Burger',
//         price:100,
//     },
//     {
//         quantity:2,
//         item:'Pizza',
//         price:200,
//     },
//     {
//         quantity:3,
//         item:'Coke',
//         price:50,
//     }
// ]);
// console.log(result);
// }

// addOrder();


const customerSchema = new mongoose.Schema({//one to many relationship
    name:String,
    email:String,
    orders:[{//this is an array of objects taken from Orders collection 
        type:mongoose.Schema.Types.ObjectId,//this is the type of the object id
        ref:'Order'//ref is used to refer to the Order collection
    }]
})

const Customer=mongoose.model('Customer',customerSchema);

const addCustomer=async()=>{
    let cust1=new Customer({
        name:'John Doe',
        email:'john@gmail.com',
        
})
//taking out the order from the order collection and storing in the customer collection
let order1=await Order.findOne({item:'Burger'});
let order2=await Order.findOne({item:'Pizza'});
cust1.orders.push(order1,order2);
let result=await cust1.save();
console.log(result);
}


addCustomer();
