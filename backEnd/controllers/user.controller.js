const User=require("../models/user.models");
const {userSchema,userEmailSchema}=require("../validations/user.validation");
const {hashedPassword,comparePassword}=require("../utils/passwordHash");
const {generateToken}=require("../utils/jsonWebToken");
const { userExists } = require("../services/user.services");

const userSignup=async (req,res,next)=>{
    try{
        const jsonData=req.body
        const validation=userSchema.safeParse(jsonData);
        if(!validation.success){
            return next(validation.error.errors[0].message);
        }

        if(await userExists({"username":jsonData.username,"email":jsonData.email})){
            return next("User Exists");
        }

        const userData=new User(jsonData);
        userData.password=await hashedPassword(jsonData.password);
        await userData.save();

        const token=generateToken({username:jsonData.username,email:jsonData.email});
        res.status(200).json({token:token,msg:"user created succesfully"});
    }
    catch(error){
        return next(error);
    }
}

const userSignin=async(req,res,next)=>{
    try{
        const jsonData=req.body;
        const validation=userEmailSchema.safeParse({email:jsonData.email});
        
        if(!validation.success){
            return next(validation.error.errors[0].message);
        }

        if(!await userExists({email:jsonData.email})){
            return next("This email is not registered with us. Please sign up.");
        }

        const userData=await User.findOne({email:jsonData.email});
        if(!await comparePassword(jsonData.password,userData.password)){
            return next("wrong password");
        }

        const token=generateToken({username:userData.username,email:userData.email});
        res.status(200).json({token})

    }catch(error){
        return next(error);
    }
}

module.exports={userSignup,userSignin};