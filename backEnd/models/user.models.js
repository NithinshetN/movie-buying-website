const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=mongoose.Schema({
    username:{type:String,required:true,unique:false},
    admin:{type:boolean,required:false,default:false},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    ordersBought:{type:[String],required:false},
    ordersRented:{type:[String],required:false},
    orderId:{type:Array(String),required:false}
})

userSchema.pre("save",async function(next){
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);
    };
});


module.exports=userSchema;