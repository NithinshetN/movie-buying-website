const Admin=require("../models/admin.models.js");
const {validateAdmin,validateAdminEmail}=require("../validations/admin.validation");
const {hashedPassword,comparePassword}=require("../utils/passwordHash");
const {generateToken}=require("../utils/jsonWebToken");
const { adminExists } = require("../services/admin.services");
const { validate } = require("uuid");

//controller to signup admin.
const adminSignup=async(req,res,next)=>{
    const data=req.body;

    //checks for zod validation
    const validation=validateAdmin(data);
    if(!validation.success){
        return next(validation.error.errors[0].message);
    }
    //checks for admin exists from findOne query validation.
    if(await adminExists(data)){
        return next("Admin Exists");
    }
    
    const signupData=await new Admin(data);
    //hashes password using bcryptjs lib.
    signupData.password=await hashedPassword(data.password);
    //saves admin.
    await signupData.save();

    //In response sends token.
    const token=generateToken({username:data.username,email:data.email});
    res.status(200).json({token:token,msg:"Admin added succesfully"});
}

const adminSignin=async(req,res,next)=>{
    const jsonData=req.body;

    //checks for zod validations
    const adminValidation=validateAdminEmail({email:jsonData.email});
    if(!adminValidation.success){
        console.dir(adminValidation.error);
        return next(adminValidation.error.errors[0].message);
    }

    //checks for admin exists valdation using serviceFindOne
    if(!await adminExists(jsonData)){
        return next("This email is not registered with us. Please sign up.");
    }   

    //gets admin details using findOne
    const adminData=await Admin.findOne({email:jsonData.email})
    //compares pasword and hashed password using bcryptjs lib
    if(!await comparePassword(jsonData.password,adminData.password)){
        return next("wrong password");
    }

    //In response sends token.
    const token=generateToken({username:adminData.username,email:adminData.email});
    res.status(200).json({msg:"admin log in succesfull",token:token})

}


module.exports={adminSignup,adminSignin};