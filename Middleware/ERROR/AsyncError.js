//exapmle error 

//if we are accessing a chat by id and it does not exist in DB we will throw an error
//async error handling 
app.get("/chat/:id", async(req,res,next)=>{
    try{
      let {id} = req.params;
      let chat = await   chats.find(c=>c.id === id);
      if(!chat){
          next(new ExpressError(404,"Chat not found"));//like this we can pass the error to the next middleware
      }
      res.render("edit.ejs",{chat});
    }catch(err){
      next(err);
    }
  });
  
  
  //now using try & catch
  //this is like we making the validation error from the client side to handle
  
  app.post("/chat", async(req,res,next)=>{
      try{
          let {from,to,message} = req.body;
          let newChat = new Chat({from,to,message});
          await newChat.save();
          res.redirect(`/chat/${newChat.id}`);
      }catch(err){
          next(err);
      }
      
  });
  
  
  //to better than try & catch we use 
  //wrapAsync function
  //combination of 3 functions
  //write it above the routes
  // to wrap the callback function
  function asyncWrap(fn){
      return function(req,res,next){
          fn(req,res,next).catch(err=>next(err));
      }
  }
  
  // now we can remove try & catch from the above code
  //write all the async functions in this way in our asyncWrap function
  app.get("/chat/:id", asyncWrap(async(req,res,next)=>{
      let {id} = req.params;
      let chat = await   chats.find(c=>c.id === id);
      if(!chat){
          next(new ExpressError(404,"Chat not found"));//like this we can pass the error to the next middleware
      }
      res.render("edit.ejs",{chat});
  }));    
  
  
  //this is the very helpfull asyncWrap function catch is also included in it it catch the error
  // we can use it for all the async functions
  



  //MONGOOSE Errors
//specific message for specific error
  const handleValidationErr = (err)=>{
    console.log(err.name);//print the error name
    if(err.name === "ValidationError"){
        console.log("validation error please follow the rules");
        console.dir(err.message);
    }
  }




  app.use((err,req,res,next)=>{
    console.log(err.name);//print the error name
    if(err.name === "ValidationError"){
       handleValidationErr(err);
    }
    next(err);
  });



      
  app.use((err,req,res,next)=>{
      let {status = 500,message = "Something went wrong"} = err;
      res.status(status).send(message);
  }); 
  
  
  
  
  