function add(a,b){
    return a+b;
}


function sub(a,b){
    return a-b;
}

module.exports= {//passing the function as an object 
    add,sub,
    addfn:add,//we have changed the name for it
    subfn:sub,
};

exports.mul=(a,b)=>a*b;//it doesn't override we can use any method for exports