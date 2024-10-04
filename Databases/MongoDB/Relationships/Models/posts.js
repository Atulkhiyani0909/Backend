const mongoose=require('mongoose');

main().then(()=>console.log('Connected to DB')).catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo');
}


//here we are using the one to squillions relationship
//ex if user has many posts then rather then storing the in users thet which post he has we store which post as been posted by which user 

//User-> post (not)
//Posts-> user (yes) one to squillion relationship

const endUserSchema=new mongoose.Schema({
    username:String,
    email:String,
    age:Number,
});

const PostSchema=new mongoose.Schema({
    content:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'endUser'//this is the reference to the User collection
    }
});

const   endUser=mongoose.model('endUser',endUserSchema);
const Post=mongoose.model('post',PostSchema);

// const  adddata=async()=>{

//     //creating a new user
//         let newendUser=new endUser({
//         username:'Soham',
//         email:'soham@gmail.com',
//         age:26
//     });


//     // let user=await endUser.findOne({username:'Rahul'}); 

//     //creating a new post
//     // let post=new Post({
//     //     content:'hello',
//     //     likes:189,
//     // });


//     let post=new Post({
//         content:'Goodbye',
//         likes:18,
//     });
//     //saving the user and the post
//     let result=await newendUser.save();
//     post.user=newendUser;//this is the reference to the user this is how we are linking the user to the post
//     let result2=await post.save();
//     console.log(result2,result);
// }

//adddata();



let getdata=async()=>{
    let result=await Post.find({}).populate('user','username');//if we need username only
    console.log(result);
}

getdata();

