const mongoose=require("mongoose");
const db=require("../db")
const bcrypt=require("bcryptjs");
db
const AdminSchema=mongoose.Schema({
    username:{type:String,required:true,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

//encryption using bcrypt library
// AdminSchema.pre("save",async function(next){
//     try{
//         const salt=await bcrypt.genSalt(10);// generate salt 
//         this.password=await bcrypt.hash(this.password,salt);//use this salt to encrypt the password in the db
//         next();
//     }catch(error){
//         next(error);
//     };
// });

const Admin=mongoose.model('Admin',AdminSchema);

module.exports=Admin;