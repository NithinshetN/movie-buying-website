const mongoose=require("mongoose");
const Movie=require("./movie.models");


const UserSchema=mongoose.Schema({
    username:{type:String,required:true,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    moviesPurchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Movie,
        required:false
    }],
    moviesRented:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Movie,
        required:false
    }],
    paymentId:{type:Array(String),required:false}
});

const User=mongoose.model("Users",UserSchema); 
module.exports=User;