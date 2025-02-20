const mongoose=require("mongoose");
const AdminSchema=mongoose.Schema({
    username:{type:String,required:true,unique:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})

const Admin=mongoose.model('Admin',AdminSchema);

module.exports=Admin;