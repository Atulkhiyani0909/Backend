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




const customerSchema = new mongoose.Schema({
    name:String,
    email:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]
});

const orderSchema = new mongoose.Schema({
    quantity:Number,
    item:String,
    price:Number,
})








customerSchema.pre("findOneAndDelete", async () =>{
    console.log('Pre delete middleware:');
});

// Ensure the context of 'this' is correct in post middleware


customerSchema.post("findOneAndDelete", async (customer) => //we are using this to also delete the orders of the customer when they are deleted from the DB 
{
    if(customer!=null && customer.orders.length){
        let res=await Order.deleteMany({_id:{$in:customer.orders}});
        console.log(res);
    }else{
        console.log("No customer found");
    }
    
   });

  const Order=mongoose.model('Order',orderSchema);
const Customer=mongoose.model('Customer',customerSchema);



const addOrder=async()=>{
    let result=  await Order.insertMany([
        {
            quantity:45,
            item:"Samosa",
            price:420
        },
        {
            quantity:1,
            item:'Burger',
            price:100,
        },
        {
            quantity:2,
            item:'Pizza',
            price:200,
        },
        {
            quantity:3,
            item:'Coke',
            price:50,
        }
    ]);
    console.log(result);
}

//addOrder();


const addCustomer=async ()=>{
    let cust1=new Customer({
        name:"Johan",
        email:'johan@gmail.com'
    });

    
 
    let order1=await Order.findOne({item:"Samosa"});
    let order2=await Order.findOne({item:"Coke"});
    //let order3=await Order.findOne({item:"Soda"});
    
    cust1.orders.push(order1,order2);

    let result= await cust1.save();
    console.log(result);
}


//addCustomer();

const delete_customer=async()=>{//now this has deleted our orders of the customer also 
    let result= await Customer.findByIdAndDelete("6702ec14d06b49f99180cad7");
    console.log(result);
}

delete_customer();

//we are trying to delete the the orders of the customer when the customer is deleted
