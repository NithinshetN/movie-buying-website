const mongoose=require("../db");
const bcrypt=require("bcryptjs");

const UserSchema=mongoose.Schema({
    username:{type:String,required:true,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    moviesPurchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:movies,
        required:false
    }],
    moviesRented:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:movies,
        required:false
    }],
    orderId:{type:Array(String),required:false}
})

//encryption using bcrypt library
// UserSchema.pre("save",async function(next){
//     try{
//         const salt=await bcrypt.genSalt(10);// generate salt 
//         this.password=await bcrypt.hash(this.password,salt);//use this salt to encrypt the password in the db
//         next();
//     }catch(error){
//         next(error);
//     };
// });

const User=mongoose.model("User",UserSchema)
module.exports=User;