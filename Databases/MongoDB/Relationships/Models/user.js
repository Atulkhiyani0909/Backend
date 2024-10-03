const mongoose = require('mongoose');


main().then(() => {
    console.log('Mongoose connected');
}).catch((err) => {
    console.log('Mongoose error');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}


const UserSchema = new mongoose.Schema({
    username: String,
    address: [{
        location:String,
        city: String,
        state: String,
        country: String,
    }]//array of objects One to few relationship 
});

const User = mongoose.model('User', UserSchema);


const addUser=async()=>{
    let user1=new User({
        username:'John Doe',
        address:[{
            location:'Home',
            city:'New York',
            state:'New York',
            country:'USA'
        }]
    })


    user1.address.push({
        location:'Work',
        city:'New York',
        state:'New York',
        country:'USA'
    })

    let result =await user1.save();
    console.log(result);

   
}


addUser();
