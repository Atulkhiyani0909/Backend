const mongoose=require('mongoose');
const { Schema } = mongoose;



//for connecting mongoDB
main().then(()=>{
    console.log("Successfully Connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Info');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//Schema
const post=new mongoose.Schema({
title:String,
author:String,
headline:String,
content:String,
});



//collections & models
const News=mongoose.model("News",post);
   
//Insert in mongoose
// const post1=new News(
//   {
//     title:"Electronics",
//     author:"Rohan Verma",
//     headline:"Prices of the Electronics Products",
//     content:"Prices decreases of the electronics as the Government reduces GST on them"
//   }
// );

// post1.save().then(()=>{//to save it to db

//   console.log("Saved Successfully");
// }).catch((err)=>{
//   console.log("Error Caused ",err)
// });


//Insert Multiple Post to the DB
// const posts = [
//   new News({
//     title: "Sports",
//     author: "Aisha Khan",
//     headline: "Local Team Wins Championship",
//     content: "In a thrilling final, the local team secured the championship title with a last-minute goal."
//   }),
//   new News({
//     title: "Health",
//     author: "Suresh Patel",
//     headline: "New Health Guidelines Released",
//     content: "The health department has released new guidelines to promote healthier living in the community."
//   }),
//   new News({
//     title: "Technology",
//     author: "Priya Singh",
//     headline: "Breakthrough in AI Technology",
//     content: "Researchers have announced a major breakthrough in artificial intelligence that could change the industry."
//   }),
//   new News({
//     title: "Environment",
//     author: "Anil Kumar",
//     headline: "New Initiative to Combat Climate Change",
//     content: "A new initiative has been launched aimed at reducing carbon emissions and promoting sustainable practices."
//   })
// ];

// // Save all posts to the database
// posts.forEach(post => {
//   post.save()
//     .then(() => console.log('Post saved:', post))
//     .catch(err => console.error('Error saving post:', err));
// });


//Insert Multiple  Good way
// News.insertMany([
//   {
//     title: "Finance",
//     author: "Sneha Reddy",
//     headline: "Stock Market Reaches All-Time High",
//     content: "Investors are celebrating as the stock market hits an all-time high, fueled by strong earnings reports."
//   },
//   {
//     title: "Travel",
//     author: "Karan Mehta",
//     headline: "Top Destinations for 2024",
//     content: "Travel experts reveal the top destinations to visit in 2024, highlighting cultural experiences and natural beauty."
//   },
//   {
//     title: "Education",
//     author: "Nina Roy",
//     headline: "New Educational Policies Announced",
//     content: "The government has announced new policies aimed at improving access to education for all children."
//   },
//   {
//     title: "Entertainment",
//     author: "Rajesh Sharma",
//     headline: "Film Festival Draws Global Attention",
//     content: "The annual film festival showcases diverse films from around the world, attracting filmmakers and audiences alike."
//   },
//   {
//     title: "Science",
//     author: "Anita Joshi",
//     headline: "Discovery of New Planet Excites Astronomers",
//     content: "Astronomers have discovered a new planet that could potentially harbor life, sparking excitement in the scientific community."
//   }
// ]).then((res)=>{
//   console.log("Data Saved",res);
// })


News.countDocuments().then((res)=>{
  console.log(res);
})

News.find({title:"Sports"}).then((data)=>{
  console.log(data[0].author);
})


News.findById();


News.updateOne({title:"Sports"},{author:"Suzan Khan"}).then((data)=>{
  console.log(data);
});


News.updateMany({title:"Environment"},{title:"Vatavaran news"}).then((data)=>{
  console.log(data);
  
});


News.findOneAndUpdate({new:true})//it will find one user and update it this new true will return the updated object
News.findByIdAndUpdate()


News.deleteOne({title:"Vatavaran news"}).then((data)=>{
  console.log(data);
})
News.deleteMany()
News.findByIdAndDelete()//it will print the deleted doccument
News.findOneAndDelete()




//Schema Validation with  constraints more at mongoose ....... website
const bookSchema= mongoose.Schema({
  author:{
   type:String,
   required:true,
   maxlength:30,
  },
  price:{
    type:Number,
    min:[1,"price is too low"],//this is the error message when the price is less than the 1

  },
  dicount:{
    type:Number,
    default:0,
  },
  category:{
    type:String,               //enum if the value in the array is not defined it will give error
    enum:["comedy","fiction"],
  }
});


//genere we can store data in the form of the array

//runValidators:true to check the constarints when we are updating the value

News.findByIdAndUpdate({runValidators:true});

//accessing the error message 
console.log(err.errors.price.properties.message);
